import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import { User } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyBL5YRYRyF5JqQITJQguxh3hVp_CMWSaZs",
  authDomain: "presto-pizza-app.firebaseapp.com",
  projectId: "presto-pizza-app",
  storageBucket: "presto-pizza-app.firebasestorage.app",
  messagingSenderId: "72370078714",
  appId: "1:72370078714:web:78f7727733554a8bd51a43"
};

// Initialize Firebase safely for hot-reloading and module resolution
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name: string, photoURL?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    name: firebaseUser.displayName || 'Guest',
    email: firebaseUser.email || '',
    isLoggedIn: true,
    addresses: [],
    photoURL: firebaseUser.photoURL || undefined
  });

  const syncUserWithFirestore = async (firebaseUser: FirebaseUser, additionalData?: any) => {
    const userRef = doc(db, "users", firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data();
        return {
            ...mapFirebaseUser(firebaseUser),
            name: userData.name || firebaseUser.displayName || 'Guest',
            photoURL: userData.photoURL || firebaseUser.photoURL || undefined,
            ...userData // Merge other fields if any
        };
    } else {
        // User exists in Auth but not in Firestore (e.g. legacy or just signed up)
        const newUser: any = {
            name: firebaseUser.displayName || additionalData?.name || 'Guest',
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL || additionalData?.photoURL || null,
            createdAt: new Date().toISOString(),
            role: 'customer'
        };
        await setDoc(userRef, newUser);
        return {
            ...mapFirebaseUser(firebaseUser),
            name: newUser.name,
            photoURL: newUser.photoURL
        };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser && (firebaseUser.emailVerified || firebaseUser.providerData[0]?.providerId === 'google.com')) {
          try {
              const fullUser = await syncUserWithFirestore(firebaseUser);
              setUser(fullUser);
          } catch (error) {
              console.error("Error syncing with Firestore:", error);
              setUser(mapFirebaseUser(firebaseUser));
          }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error: any) => {
    console.error("Auth Error Code:", error.code);
    
    if (error.code === 'auth/unauthorized-domain') {
      const domain = window.location.hostname;
      return `Domain Unauthorized: You must add "${domain}" to the "Authorized domains" list in your Firebase Authentication settings.`;
    }
    
    if (error.code === 'auth/popup-closed-by-user') {
      return null;
    }

    if (error.code === 'auth/account-exists-with-different-credential') {
      return "An account already exists with this email using a different login method.";
    }

    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      return "Invalid email or password. Please try again.";
    }

    if (error.code === 'auth/requires-recent-login') {
      return "For security, please log out and log back in to perform this action.";
    }

    return error.message || "An unexpected authentication error occurred.";
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Sync happens in onAuthStateChanged, but we can do a check here if needed.
      // However, we must check verification first.
      if (!userCredential.user.emailVerified) {
          await sendEmailVerification(userCredential.user);
          await signOut(auth);
          throw new Error('EMAIL_NOT_VERIFIED');
      }
      // Explicitly sync to ensure data is ready or created if missing
      await syncUserWithFirestore(userCredential.user);
    } catch (error: any) {
      if (error.message === 'EMAIL_NOT_VERIFIED') throw error;
      const msg = handleAuthError(error);
      if (msg) throw new Error(msg);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncUserWithFirestore(result.user);
      }
    } catch (error: any) {
      const msg = handleAuthError(error);
      if (msg) throw new Error(msg);
    }
  };

  const signup = async (email: string, password: string, name: string, photoURL?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        const pURL = photoURL && photoURL.length < 2000000 ? photoURL : undefined; // Start limit check
        await firebaseUpdateProfile(userCredential.user, { 
            displayName: name,
            photoURL: pURL 
        });
        
        // Create Firestore Document
        await setDoc(doc(db, "users", userCredential.user.uid), {
            name,
            email,
            photoURL: pURL || null,
            createdAt: new Date().toISOString(),
            role: 'customer'
        });

        await sendEmailVerification(userCredential.user);
        await signOut(auth);
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
          throw new Error('This email is already registered. Please sign in instead.');
      }
      const msg = handleAuthError(error);
      if (msg) throw new Error(msg);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (auth.currentUser) {
      const updateData: any = {};
      if (data.name !== undefined) updateData.displayName = data.name;
      if (data.photoURL !== undefined) {
           // Basic size check for Base64 strings to avoid Firestore limits (approx 1MB safety)
           if (data.photoURL.length < 1048487) { 
               updateData.photoURL = data.photoURL;
           } else {
                throw new Error("Image too large. Please use an image under 1MB.");
           }
      }
      
      if (Object.keys(updateData).length > 0) {
        await firebaseUpdateProfile(auth.currentUser, updateData);
        
        // Update Firestore
        const firestoreUpdate: any = {};
        if (data.name) firestoreUpdate.name = data.name;
        if (updateData.photoURL) firestoreUpdate.photoURL = updateData.photoURL;
        
        if (Object.keys(firestoreUpdate).length > 0) {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, firestoreUpdate);
        }
      }

      // Optimistic update for UI speed, though onAuthStateChanged handles the real sync
      setUser(prev => prev ? {
          ...prev,
          name: data.name || prev.name,
          photoURL: (updateData.photoURL) || prev.photoURL
      } : null);
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const deleteAccount = async () => {
      if (auth.currentUser) {
          const uid = auth.currentUser.uid;
          try {
              // Delete from Firestore
              await deleteDoc(doc(db, "users", uid));
              // Delete from Auth
              await deleteUser(auth.currentUser);
              setUser(null);
          } catch (error: any) {
              const msg = handleAuthError(error);
              throw new Error(msg || "Failed to delete account");
          }
      }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, signup, logout, updateProfile, resetPassword, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};