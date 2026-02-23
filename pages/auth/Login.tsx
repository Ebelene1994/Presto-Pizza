
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZrLBTuezhzClsDbkiEXLXzcbhwNTlmyQ1XKGwOrxcg&s";

interface LoginProps {
  onNavigate: (page: string, email?: string) => void;
  onLoginSuccess: () => void;
}

export default function Login({ onNavigate, onLoginSuccess }: LoginProps) {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err: any) {
      if (err.message === 'EMAIL_NOT_VERIFIED') {
          onNavigate('verify-email', email);
      } else {
          setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
        await loginWithGoogle();
        onLoginSuccess();
    } catch (err: any) {
        setError(err.message || 'Google sign-in failed.');
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

      {/* Login Card */}
      <div className="relative z-20 w-full max-w-md px-4 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 p-8 text-center border-b border-gray-100">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <img src={LOGO_URL} alt="Presto Logo" className="w-10 h-10 rounded-full object-cover shadow-lg" />
                    <span className="text-2xl font-bold text-gray-900">
                        Presto<span className="text-red-600">Pizza</span>
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
                <p className="text-gray-500 text-sm mt-1">Sign in to order faster and manage your account</p>
            </div>

            {/* Form */}
            <div className="p-8">
                {error && (
                    <div className="mb-6 bg-red-50 text-red-600 px-4 py-4 rounded-xl flex items-start gap-3 text-sm font-medium border border-red-100 animate-in slide-in-from-top-2">
                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{error}</span>
                    </div>
                )}

                <div className="space-y-4 mb-8">
                    <button 
                        onClick={handleGoogleLogin}
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

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="flex-shrink mx-4 text-xs text-gray-400 font-black uppercase tracking-widest">or email</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                            <input 
                                type="email"
                                required 
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between ml-1">
                            <label className="text-sm font-bold text-gray-700">Password</label>
                            <button 
                                type="button" 
                                onClick={() => onNavigate('forgot-password', email)}
                                className="text-sm font-bold text-red-600 hover:text-red-700 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden group"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <span className="relative z-10 group-hover:scale-105 transition-transform">Sign In</span>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 font-medium">
                        Don't have an account?{' '}
                        <button onClick={() => onNavigate('signup')} className="text-red-600 font-bold hover:underline">
                            Sign up for free
                        </button>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
