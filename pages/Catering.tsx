
import React, { useState, useRef } from 'react';
import { 
    Users, Calendar, MapPin, ChefHat, CheckCircle, 
    Truck, Award, Utensils, Info, Check, ArrowRight,
    MessageCircle, Star, Phone, Mail, ChevronRight
} from 'lucide-react';

interface CateringProps {
    onNavigate: (page: string) => void;
}

const CATERING_PACKAGES = [
    {
        id: 'social',
        name: 'The Social',
        subtitle: 'Perfect for small gatherings',
        price: 'From $15/person',
        minGuests: '15 Guests Min',
        color: 'bg-white',
        border: 'border-gray-100',
        features: [
            'Assorted Artisan Pizzas (4 types)',
            'Classic Garden or Caesar Salad',
            'Presto Garlic Knots',
            'Soft Drink Station',
            'Biodegradable Plates & Cutlery'
        ]
    },
    {
        id: 'corporate',
        name: 'The Corporate',
        subtitle: 'Ideal for office events & meetings',
        price: 'From $22/person',
        minGuests: '25 Guests Min',
        color: 'bg-red-50',
        border: 'border-red-100',
        popular: true,
        features: [
            'All Social Package Items',
            'Additional Premium Pasta Platter',
            'Antipasto Skewers',
            'Selection of Desserts (Tiramisu)',
            'On-site delivery & setup',
            'Dedicated Event Coordinator'
        ]
    },
    {
        id: 'feast',
        name: 'The Grand Feast',
        subtitle: 'Weddings & large celebrations',
        price: 'From $35/person',
        minGuests: '50 Guests Min',
        color: 'bg-amber-50',
        border: 'border-amber-100',
        features: [
            'Full Artisan Menu Access',
            'Live Mobile Wood-Fired Oven',
            'Chef-attended Stations',
            'Appetizer & Dessert Bar',
            'Custom Menu Planning',
            'Waitstaff Service (4 hours)'
        ]
    }
];

export default function Catering({ onNavigate }: CateringProps) {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const formRef = useRef<HTMLDivElement>(null);
    const packagesRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: '',
        package: 'corporate',
        message: ''
    });

    const scrollToForm = (pkgId?: string) => {
        if (pkgId) {
            setFormData(prev => ({ ...prev, package: pkgId }));
        }
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const scrollToPackages = () => {
        packagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');

        const data = new FormData(e.currentTarget);
        data.append("access_key", "cae56c3a-13e8-4ed8-ac4f-1ac20111063f");
        data.append("subject", `New Catering Inquiry: ${formData.package}`);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data
            });

            const result = await response.json();
            if (result.success) {
                setFormStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    guests: '',
                    package: 'corporate',
                    message: ''
                });
                setTimeout(() => setFormStatus('idle'), 8000);
            } else {
                alert("Something went wrong. Please try again.");
                setFormStatus('idle');
            }
        } catch (err) {
            alert("Network error. Please try again.");
            setFormStatus('idle');
        }
    };

    return (
        <div className="bg-white animate-in fade-in duration-500 pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center py-20 lg:py-32">
                {/* Background Container */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <div 
                        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')` }}
                    />
                </div>
                
                <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-amber-400 text-black font-black text-xs uppercase tracking-[0.2em] mb-8 animate-in slide-in-from-top-4 duration-700">
                        Artisan Italian Catering
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Unforgettable <br/> <span className="text-amber-400">Flavor</span> for Your Event
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        From corporate lunches to dream weddings, we bring our stone ovens and Nonna's secrets to you.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                        <button 
                            onClick={() => scrollToForm()}
                            className="bg-red-600 hover:bg-red-700 text-white text-lg font-black px-12 py-5 rounded-full transition-all hover:scale-105 shadow-2xl shadow-red-900/40 flex items-center gap-3 active:scale-95"
                        >
                            Book Now <ChevronRight size={20} />
                        </button>
                        <button 
                            onClick={scrollToPackages}
                            className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white text-lg font-black px-12 py-5 rounded-full transition-all hover:scale-105 active:scale-95"
                        >
                            View Event Menu
                        </button>
                    </div>
                </div>
                
                {/* Scroll Down Hint */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/50 animate-bounce cursor-pointer" onClick={() => scrollToPackages()}>
                    <Info size={32} />
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <button onClick={() => onNavigate('home')} className="hover:text-red-600 transition-colors">Home</button>
                    <ChevronRight size={12} />
                    <span className="text-gray-900">Catering</span>
                </div>
            </div>

            {/* Why Presto Section */}
            <section className="py-24 container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">The Presto Standard</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Italian Hospitality Anywhere</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        We don't just cater food; we deliver an experience. Our professional team handles everything from setup to service, so you can enjoy your event.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {[
                        { icon: Truck, title: "Mobile Ovens", desc: "Our hand-built wood-fired ovens reach 900°F, baking authentic Neapolitan pizza live for your guests." },
                        { icon: ChefHat, title: "Custom Menus", desc: "Collaborate with Elena, our Head Chef, to design a bespoke menu featuring seasonal Italian specialties." },
                        { icon: Award, title: "Elite Service", desc: "Staffed by catering professionals trained in high-end hospitality to ensure a seamless execution." }
                    ].map((feature, idx) => (
                        <div key={idx} className="text-center group p-8 rounded-[3rem] hover:bg-gray-50 transition-all duration-500">
                            <div className="w-24 h-24 bg-white text-red-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 transition-all group-hover:scale-110 shadow-xl shadow-red-100 group-hover:shadow-red-200 border border-red-50">
                                <feature.icon size={44} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Packages Section */}
            <section ref={packagesRef} className="py-28 bg-gray-900 text-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-[120px]"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Event Packages</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-6">Designed for Every Occasion</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Choose a curated experience or let us build something completely unique.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {CATERING_PACKAGES.map((pkg) => (
                            <div 
                                key={pkg.id} 
                                className={`bg-white/5 border-2 border-white/10 backdrop-blur-sm rounded-[3.5rem] p-10 flex flex-col relative transition-all hover:bg-white/10 hover:border-white/20 group`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                                        Signature Choice
                                    </div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-3xl font-black text-white mb-2">{pkg.name}</h3>
                                    <p className="text-gray-400 font-bold text-sm uppercase tracking-wider">{pkg.subtitle}</p>
                                </div>
                                <div className="mb-10 p-6 bg-white/5 rounded-3xl border border-white/5">
                                    <div className="text-4xl font-black text-amber-400">{pkg.price}</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                                        <Users size={14} /> {pkg.minGuests}
                                    </div>
                                </div>
                                <div className="space-y-5 mb-12 flex-1">
                                    {pkg.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="bg-red-600/20 text-red-500 p-1 rounded-full shrink-0 mt-0.5">
                                                <Check size={14} strokeWidth={4} />
                                            </div>
                                            <span className="text-sm font-bold text-gray-300 leading-tight">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => scrollToForm(pkg.id)}
                                    className={`w-full py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest text-center transition-all shadow-xl active:scale-95 ${
                                        pkg.id === 'corporate' 
                                        ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-900/40' 
                                        : 'bg-white text-gray-900 hover:bg-amber-400'
                                    }`}
                                >
                                    Select This Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section ref={formRef} id="inquiry-form" className="py-24 container mx-auto px-4 max-w-6xl">
                <div className="bg-white rounded-[4rem] shadow-2xl border border-gray-100 overflow-hidden relative">
                    <div className="flex flex-col lg:flex-row">
                        
                        {/* Sidebar Info */}
                        <div className="bg-red-600 text-white p-12 lg:w-[400px] shrink-0 relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-4xl font-black mb-8 leading-tight">Let's Plan Your Feast</h2>
                                <p className="text-red-100 text-lg mb-12 opacity-90 leading-relaxed font-medium">
                                    Fill out the form and our dedicated event coordinator will reach out within 24 hours to help you craft the perfect menu.
                                </p>
                                
                                <div className="space-y-10">
                                    <div className="flex items-start gap-5">
                                        <div className="bg-white/20 p-4 rounded-2xl shadow-inner">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Direct Line</div>
                                            <div className="font-black text-xl hover:text-amber-400 transition-colors cursor-pointer">+1 (234) 567-890</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="bg-white/20 p-4 rounded-2xl shadow-inner">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Inquiry Email</div>
                                            <div className="font-black text-xl hover:text-amber-400 transition-colors cursor-pointer">events@prestopizza.com</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="bg-white/20 p-4 rounded-2xl shadow-inner">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Lead Time</div>
                                            <div className="font-black text-xl">Ideally 2+ Weeks</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 pt-10 border-t border-white/20">
                                    <button 
                                        onClick={() => onNavigate('contact')}
                                        className="flex items-center gap-3 font-black text-sm uppercase tracking-widest text-white hover:text-amber-400 transition-colors group"
                                    >
                                        Custom Request? <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                            <Utensils size={200} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
                        </div>

                        {/* Main Form */}
                        <div className="p-10 md:p-16 flex-1 relative">
                            {formStatus === 'success' && (
                                <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center text-center p-10 animate-in fade-in zoom-in-95 duration-500">
                                    <div className="w-28 h-28 bg-green-50 text-green-500 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-green-100 border border-green-100">
                                        <CheckCircle size={56} />
                                    </div>
                                    <h3 className="text-4xl font-black text-gray-900 mb-6">Grazie Mille!</h3>
                                    <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed font-medium">
                                        Your catering inquiry has been received. Our event team is already checking availability for your date and will contact you shortly!
                                    </p>
                                    <button 
                                        onClick={() => setFormStatus('idle')}
                                        className="mt-12 bg-gray-900 text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-gray-200 active:scale-95"
                                    >
                                        Close Message
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className={`space-y-8 ${formStatus === 'submitting' ? 'opacity-40 pointer-events-none' : ''}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Contact Name</label>
                                        <input 
                                            required 
                                            name="name"
                                            type="text" 
                                            className="w-full px-6 py-5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Phone Number</label>
                                        <input 
                                            required 
                                            name="phone"
                                            type="tel" 
                                            className="w-full px-6 py-5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                            placeholder="(555) 000-0000"
                                            value={formData.phone}
                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Email Address</label>
                                    <input 
                                        required 
                                        name="email"
                                        type="email" 
                                        className="w-full px-6 py-5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Event Date</label>
                                        <input 
                                            required 
                                            name="date"
                                            type="date" 
                                            className="w-full px-6 py-5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-bold text-gray-900 uppercase"
                                            value={formData.date}
                                            onChange={e => setFormData({...formData, date: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Guest Count</label>
                                        <input 
                                            required 
                                            name="guests"
                                            type="number" 
                                            className="w-full px-6 py-5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                            placeholder="Min. 15"
                                            value={formData.guests}
                                            onChange={e => setFormData({...formData, guests: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Desired Package</label>
                                    <div className="relative">
                                        <select 
                                            name="package"
                                            className="w-full px-6 py-5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                                            value={formData.package}
                                            onChange={e => setFormData({...formData, package: e.target.value})}
                                        >
                                            <option value="social">The Social Package</option>
                                            <option value="corporate">The Corporate Package</option>
                                            <option value="feast">The Grand Feast Package</option>
                                            <option value="custom">Completely Custom Event</option>
                                        </select>
                                        <ChevronRight size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Special Requirements</label>
                                    <textarea 
                                        name="message"
                                        rows={4} 
                                        className="w-full px-6 py-5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-bold text-gray-900 resize-none placeholder:text-gray-300"
                                        placeholder="Any dietary restrictions, venue specifics, or custom menu requests?"
                                        value={formData.message}
                                        onChange={e => setFormData({...formData, message: e.target.value})}
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full bg-red-600 text-white py-6 rounded-[1.8rem] font-black text-xl hover:bg-red-700 transition-all shadow-2xl shadow-red-200 flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-70 group"
                                >
                                    {formStatus === 'submitting' ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Event Inquiry</span>
                                            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    Secure Submission via Presto Enterprise Network
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "How far in advance should I book?", a: "We recommend at least 2 weeks notice for large events, but we can sometimes accommodate smaller parties with 48 hours notice." },
                            { q: "Do you offer gluten-free or vegan options?", a: "Absolutely! Our chefs can customize any catering package to include our award-winning gluten-free crusts and plant-based cheeses." },
                            { q: "Is there a delivery fee?", a: "Delivery and setup are included in our Corporate and Grand Feast packages within our standard service area." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-black text-gray-900 mb-3 flex items-center gap-3">
                                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                    {faq.q}
                                </h4>
                                <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-16 text-center">
                        <p className="text-gray-500 font-bold mb-6 italic">Still have more specific questions?</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button 
                                onClick={() => onNavigate('contact')}
                                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={18} /> Chat with a Specialist
                            </button>
                            <button 
                                onClick={() => onNavigate('menu')}
                                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all shadow-sm active:scale-95"
                            >
                                Browse Food Menu
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const Loader2 = ({ className, size }: { className?: string, size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);
