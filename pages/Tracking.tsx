
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { OrderInfo } from '../types';

interface TrackingProps {
  orderInfo: OrderInfo;
  onNavigate: (page: string) => void;
}

export default function Tracking({ orderInfo, onNavigate }: TrackingProps) {
  const [progress, setProgress] = useState(1);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins in seconds

  useEffect(() => {
    // Simulate progress updates
    const timer = setInterval(() => {
      setProgress(p => (p < 5 ? p + 1 : 5));
    }, 5000); // Update every 5 seconds for demo

    // Countdown timer
    const countdown = setInterval(() => {
        setTimeLeft(t => t > 0 ? t - 1 : 0);
    }, 1000);

    return () => {
        clearInterval(timer);
        clearInterval(countdown);
    };
  }, []);

  const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const steps = [
    { id: 1, label: 'Order Placed', time: '10:30 AM' },
    { id: 2, label: 'Preparing', time: '10:32 AM' },
    { id: 3, label: 'Baking', time: '10:40 AM' },
    { id: 4, label: 'Quality Check', time: '10:50 AM' },
    { id: 5, label: orderInfo.method === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup', time: '10:55 AM' }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center mb-8">
            <div className="bg-green-500 p-8 text-white">
                <div className="w-20 h-20 bg-white text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle size={48} />
                </div>
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-green-100 text-lg">Thank you for ordering, {orderInfo.contact.name.split(' ')[0]}.</p>
            </div>
            
            <div className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
                    <div className="text-center">
                        <div className="text-gray-400 text-sm font-bold uppercase mb-1">Estimated Delivery</div>
                        <div className="text-4xl font-bold text-gray-900">{formatTime(timeLeft)}</div>
                    </div>
                    <div className="hidden md:block w-px h-16 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="text-gray-400 text-sm font-bold uppercase mb-1">Order Number</div>
                        <div className="text-4xl font-bold text-gray-900">#8291</div>
                    </div>
                </div>

                {/* Tracking Steps */}
                <div className="relative flex justify-between items-center mb-12 max-w-2xl mx-auto">
                    {/* Line background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 transform -translate-y-1/2"></div>
                    <div 
                        className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 transform -translate-y-1/2 transition-all duration-1000"
                        style={{ width: `${((progress - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-500 ${
                                step.id <= progress 
                                ? 'bg-green-500 border-green-500 text-white scale-110' 
                                : 'bg-white border-gray-200 text-gray-300'
                            }`}>
                                {step.id <= progress ? <CheckCircle size={14} /> : step.id}
                            </div>
                            <span className={`text-xs font-bold whitespace-nowrap hidden sm:block ${
                                step.id <= progress ? 'text-gray-900' : 'text-gray-300'
                            }`}>{step.label}</span>
                        </div>
                    ))}
                </div>

                {/* Map Placeholder */}
                <div className="bg-gray-200 rounded-2xl h-64 w-full relative overflow-hidden mb-8 group">
                     {/* Placeholder Pattern */}
                     <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                     <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
                        <MapPin size={48} className="mb-2 text-gray-400" />
                        <span className="font-bold">Live Map Tracking</span>
                        <span className="text-sm">(Map integration loading...)</span>
                     </div>
                     
                     {/* Fake Driver */}
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg animate-pulse">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                     </div>
                </div>

                <button 
                    onClick={() => onNavigate('home')}
                    className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                >
                    Return Home
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
