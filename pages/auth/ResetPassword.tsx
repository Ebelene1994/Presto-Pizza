
import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';

const LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZrLBTuezhzClsDbkiEXLXzcbhwNTlmyQ1XKGwOrxcg&s";

interface ResetPasswordProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: () => void;
}

export default function ResetPassword({ onNavigate, onLoginSuccess }: ResetPasswordProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [passwords, setPasswords] = useState({
      new: '',
      confirm: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
        alert("Passwords do not match");
        return;
    }
    
    setIsLoading(true);

    // Mock API Call
    setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        // Auto redirect
        setTimeout(() => {
            onLoginSuccess();
        }, 2000);
    }, 1500);
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
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {isSuccess ? (
                <div className="p-10 text-center animate-in slide-in-from-right duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 shadow-sm">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Updated!</h2>
                    <p className="text-gray-500 mb-8">
                        Your password has been changed successfully. Logging you in...
                    </p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full bg-green-500 animate-[grow_2s_ease-out_forwards] origin-left w-full"></div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <img src={LOGO_URL} alt="Presto Logo" className="w-8 h-8 rounded-full object-cover shadow-lg" />
                            <span className="text-xl font-bold text-gray-900">
                                Presto<span className="text-red-600">Pizza</span>
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">New Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                        placeholder="••••••••"
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Confirm Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                                    <input 
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                        placeholder="••••••••"
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200 disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Reset Password <ArrowRight size={20} /></>
                                    )}
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
