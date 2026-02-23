
import React, { useState } from 'react';
import { 
    Mail, Lock, User, Phone, 
    CheckCircle, ArrowRight,
    Eye, EyeOff, Camera, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZrLBTuezhzClsDbkiEXLXzcbhwNTlmyQ1XKGwOrxcg&s";

interface SignUpProps {
  onNavigate: (page: string, email?: string) => void;
  onLoginSuccess: () => void;
}

export default function SignUp({ onNavigate, onLoginSuccess }: SignUpProps) {
  const { signup, loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      photo: null as File | null
  });

  const updateForm = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          updateForm('photo', e.target.files[0]);
      }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setIsLoading(true);
    try {
        await loginWithGoogle();
        onLoginSuccess();
    } catch (err: any) {
        setError(err.message || 'Google sign-up failed.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      if (formData.password !== formData.repeatPassword) {
          setError("Passwords do not match");
          return;
      }
      
      setIsLoading(true);

      try {
          let photoDataUrl = '';
          if (formData.photo) {
              photoDataUrl = await new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result as string);
                  reader.readAsDataURL(formData.photo!);
              });
          }

          await signup(formData.email, formData.password, formData.name, photoDataUrl);
          // After signup, user is signed out and needs to verify
          onNavigate('verify-email', formData.email);
      } catch (err: any) {
          setError(err.message);
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen w-full flex items-center justify-center relative bg-gray-900">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=2000&q=80')` }}
      ></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm"></div>

      {/* SignUp Card */}
      <div className="relative z-20 w-full max-w-lg px-4 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <img src={LOGO_URL} alt="Presto Logo" className="w-8 h-8 rounded-full object-cover shadow-md" />
                    <span className="text-xl font-bold text-gray-900">
                        Presto<span className="text-red-600">Pizza</span>
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Join the Presto Family</h2>
                <p className="text-gray-500 text-sm mt-1">Get exclusive access to deals and faster ordering</p>
            </div>

            <div className="p-8 pb-0">
                <button 
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3.5 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98] shadow-sm disabled:opacity-70"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>

                <div className="relative flex items-center py-6">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-4 text-xs text-gray-400 font-black uppercase tracking-widest">or email signup</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 pt-0">
                {error && (
                    <div className="mb-6 bg-red-50 text-red-600 px-4 py-4 rounded-xl flex items-start gap-3 text-sm font-medium border border-red-100 animate-in slide-in-from-top-2">
                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}
                
                <div className="space-y-5">
                    {/* Profile Photo Placeholder UI */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 group hover:border-red-400 transition-colors">
                            {formData.photo ? (
                                <img src={URL.createObjectURL(formData.photo)} className="w-full h-full rounded-full object-cover" alt="Profile" />
                            ) : (
                                <Camera size={32} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                            )}
                            <input 
                                type="file" 
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                        </div>
                        <span className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">Profile Photo</span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                required
                                type="text"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none bg-gray-50 focus:bg-white transition-all font-medium"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => updateForm('name', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                required
                                type="email"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none bg-gray-50 focus:bg-white transition-all font-medium"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => updateForm('email', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none bg-gray-50 focus:bg-white transition-all font-medium"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => updateForm('password', e.target.value)}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Repeat Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none bg-gray-50 focus:bg-white transition-all font-medium"
                                    placeholder="••••••••"
                                    value={formData.repeatPassword}
                                    onChange={(e) => updateForm('repeatPassword', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-transform hover:scale-[1.02] shadow-lg shadow-red-200 disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>Create Account <CheckCircle size={20} /></>
                        )}
                    </button>
                </div>

            </form>

            <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                <p className="text-gray-500 text-sm">
                    Already have an account?{' '}
                    <button onClick={() => onNavigate('login')} className="text-red-600 font-bold hover:underline">
                        Log In
                    </button>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
