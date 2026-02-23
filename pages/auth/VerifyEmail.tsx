
import React from 'react';
import { Mail, CheckCircle, ArrowRight, LogIn } from 'lucide-react';

const LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZrLBTuezhzClsDbkiEXLXzcbhwNTlmyQ1XKGwOrxcg&s";

interface VerifyEmailProps {
  email: string;
  onNavigate: (page: string) => void;
}

export default function VerifyEmail({ email, onNavigate }: VerifyEmailProps) {
  return (
    <div className="pt-32 pb-20 min-h-screen w-full flex items-center justify-center relative bg-gray-900">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=2000&q=80')` }}
      ></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm"></div>

      <div className="relative z-20 w-full max-w-md px-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10 text-center">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-amber-100/50">
                <Mail size={40} />
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 mb-4">Verify Your Email</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
                We’ve sent a verification email to <span className="font-bold text-red-600 underline">{email || 'your email address'}</span>. Please verify your email, then log in.
            </p>

            <div className="space-y-4">
                <button 
                    onClick={() => onNavigate('login')}
                    className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-3 active:scale-95 group"
                >
                    <LogIn size={22} />
                    Log In
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest pt-4">
                    Didn't receive the email? <br/>
                    <span className="text-gray-500">Check your spam folder or try logging in again to resend it.</span>
                </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-center gap-2">
                <img src={LOGO_URL} alt="Presto Logo" className="w-6 h-6 rounded-full grayscale opacity-50" />
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Presto Pizza Security</span>
            </div>
        </div>
      </div>
    </div>
  );
}
