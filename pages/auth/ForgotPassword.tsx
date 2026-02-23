
import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, AlertCircle, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZrLBTuezhzClsDbkiEXLXzcbhwNTlmyQ1XKGwOrxcg&s";

interface ForgotPasswordProps {
  onNavigate: (page: string) => void;
}

export default function ForgotPassword({ onNavigate }: ForgotPasswordProps) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        await resetPassword(email);
        setIsSuccess(true);
    } catch (err: any) {
        setError(err.message || 'Failed to send reset link.');
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

      {/* Card */}
      <div className="relative z-20 w-full max-w-md px-4 animate-in fade-in zoom-in-95 duration-500">

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            {isSuccess ? (
                <div className="p-10 text-center animate-in slide-in-from-right duration-500">
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100/50">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Email Sent!</h2>
                    <p className="text-gray-500 mb-10 leading-relaxed">
                        We’ve sent a password reset link to <span className="font-bold text-red-600 underline">{email}</span>.
                    </p>
                    
                    <button 
                        onClick={() => onNavigate('login')}
                        className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-gray-100 flex items-center justify-center gap-3 active:scale-95 group"
                    >
                        <LogIn size={22} />
                        Sign In
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            ) : (
                <>
                    <div className="bg-gray-50 px-8 py-8 border-b border-gray-100 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <img src={LOGO_URL} alt="Presto Logo" className="w-8 h-8 rounded-full object-cover shadow-lg" />
                            <span className="text-xl font-bold text-gray-900">
                                Presto<span className="text-red-600">Pizza</span>
                            </span>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Forgot Password?</h2>
                    </div>

                    <div className="p-10">
                        <p className="text-gray-500 text-center mb-8 font-medium">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        {error && (
                            <div className="mb-6 bg-red-50 text-red-600 px-4 py-4 rounded-xl flex items-start gap-3 text-sm font-medium border border-red-100 animate-in slide-in-from-top-2">
                                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                    <input 
                                        type="email"
                                        required 
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button 
                                    type="submit" 
                                    disabled={isLoading || !email}
                                    className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-200 disabled:opacity-70 flex items-center justify-center group active:scale-95"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Get Reset Link <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => onNavigate('login')}
                                    className="w-full bg-gray-50 text-gray-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors active:scale-95"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
}
