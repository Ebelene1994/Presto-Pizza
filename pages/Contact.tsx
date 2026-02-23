
import React, { useState } from 'react';
import { 
    Mail, Phone, MapPin, Clock, MessageCircle, 
    DollarSign, TrendingUp, Users, CheckCircle, 
    Download, ArrowRight, Building 
} from 'lucide-react';
import { LOCATIONS, FRANCHISE_STATS, FRANCHISE_STEPS } from '../data';

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'contact' | 'franchise'>('contact');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({
      name: '',
      email: '',
      store: '',
      subject: '',
      message: ''
  });

  // Franchise Form State
  const [franchiseForm, setFranchiseForm] = useState({
      name: '',
      email: '',
      phone: '',
      capital: '',
      location: '',
      experience: ''
  });

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormStatus('submitting');

      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "cae56c3a-13e8-4ed8-ac4f-1ac20111063f");

      try {
          const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
          });

          const data = await response.json();
          if (data.success) {
              setFormStatus('success');
              setContactForm({ name: '', email: '', store: '', subject: '', message: '' });
              // Reset overlay after 3 seconds
              setTimeout(() => {
                  setFormStatus('idle');
              }, 3000);
          } else {
              alert(data.message || "Something went wrong. Please try again.");
              setFormStatus('idle');
          }
      } catch (err) {
          alert("Network error. Please check your connection and try again.");
          setFormStatus('idle');
      }
  };

  const handleFranchiseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormStatus('submitting');
      
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "cae56c3a-13e8-4ed8-ac4f-1ac20111063f");
      formData.append("subject", "New Franchise Inquiry");

      try {
          const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
          });

          const data = await response.json();
          if (data.success) {
              setFormStatus('success');
              setFranchiseForm({ name: '', email: '', phone: '', capital: '', location: '', experience: '' });
              setTimeout(() => {
                  setFormStatus('idle');
              }, 3000);
          } else {
              alert(data.message || "Something went wrong. Please try again.");
              setFormStatus('idle');
          }
      } catch (err) {
          alert("Network error. Please check your connection and try again.");
          setFormStatus('idle');
      }
  };

  return (
    <div className="bg-white animate-in fade-in duration-500 pt-20">
      
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Get in Touch</h1>
            
            {/* Tab Switcher */}
            <div className="inline-flex bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20">
                <button 
                    onClick={() => setActiveTab('contact')}
                    className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                        activeTab === 'contact' 
                        ? 'bg-red-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                >
                    Contact Us
                </button>
                <button 
                    onClick={() => setActiveTab('franchise')}
                    className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                        activeTab === 'franchise' 
                        ? 'bg-amber-400 text-gray-900 shadow-lg' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                >
                    Own a Franchise
                </button>
            </div>
        </div>
      </section>

      {/* Contact Tab Content */}
      {activeTab === 'contact' && (
          <div className="container mx-auto px-4 py-16 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                  
                  {/* Left Column: Info */}
                  <div className="lg:w-1/3 space-y-8">
                      <div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">We'd love to hear from you</h2>
                          <p className="text-gray-500">
                              Whether you have a question about our menu, feedback on your recent order, or just want to say hello, we're here to help.
                          </p>
                      </div>

                      <div className="space-y-6">
                          <div className="flex items-start gap-4">
                              <div className="bg-red-50 p-3 rounded-full text-red-600">
                                  <Phone size={24} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-gray-900">Phone Support</h4>
                                  <p className="text-gray-500 mb-1">Mon-Fri 9am-6pm</p>
                                  <a href="tel:+1234567890" className="text-red-600 font-bold hover:underline">+1 (234) 567-890</a>
                              </div>
                          </div>
                          
                          <div className="flex items-start gap-4">
                              <div className="bg-red-50 p-3 rounded-full text-red-600">
                                  <Mail size={24} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-gray-900">Email</h4>
                                  <p className="text-gray-500 mb-1">We usually reply within 24 hours</p>
                                  <a href="mailto:hello@prestopizza.com" className="text-red-600 font-bold hover:underline">hello@prestopizza.com</a>
                              </div>
                          </div>

                          <div className="flex items-start gap-4">
                              <div className="bg-red-50 p-3 rounded-full text-red-600">
                                  <MapPin size={24} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-gray-900">Headquarters</h4>
                                  <p className="text-gray-500">
                                      123 Pizza Lane, Suite 500<br/>
                                      New York, NY 10001
                                  </p>
                              </div>
                          </div>
                      </div>

                      {/* Live Chat Card - Linked to WhatsApp */}
                      <a 
                        href="https://wa.me/233542134605" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-gray-900 text-white p-6 rounded-2xl relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                      >
                          <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-4">
                                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="font-bold text-sm uppercase tracking-wider">Live Chat</span>
                              </div>
                              <h3 className="text-xl font-bold mb-2">Chat with Support</h3>
                              <p className="text-gray-400 text-sm mb-4">Get instant answers from our support team on WhatsApp.</p>
                              <div className="inline-flex bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm items-center gap-2 group-hover:bg-amber-400 transition-colors">
                                  Start Chat <MessageCircle size={16} />
                              </div>
                          </div>
                          <MessageCircle size={120} className="absolute -bottom-4 -right-4 text-white/5 rotate-12 group-hover:scale-110 transition-transform" />
                      </a>
                  </div>

                  {/* Right Column: Form */}
                  <div className="lg:w-2/3">
                      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 relative overflow-hidden">
                          {formStatus === 'success' ? (
                              <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center animate-in fade-in">
                                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                                      <CheckCircle size={48} />
                                  </div>
                                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                  <p className="text-gray-500 max-w-xs">We've received your message via Web3Forms and will get back to you shortly.</p>
                              </div>
                          ) : null}

                          <form onSubmit={handleContactSubmit} className={`space-y-6 ${formStatus === 'submitting' ? 'opacity-50 pointer-events-none' : ''}`}>
                              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                      <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                      <input 
                                        required
                                        name="name"
                                        type="text" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition-all"
                                        placeholder="John Doe"
                                        value={contactForm.name}
                                        onChange={e => setContactForm({...contactForm, name: e.target.value})}
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                      <input 
                                        required
                                        name="email"
                                        type="email" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition-all"
                                        placeholder="john@example.com"
                                        value={contactForm.email}
                                        onChange={e => setContactForm({...contactForm, email: e.target.value})}
                                      />
                                  </div>
                              </div>

                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Store (Optional)</label>
                                  <select 
                                    name="store"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition-all appearance-none bg-white"
                                    value={contactForm.store}
                                    onChange={e => setContactForm({...contactForm, store: e.target.value})}
                                  >
                                      <option value="">General Inquiry / Corporate</option>
                                      {LOCATIONS.map(loc => (
                                          <option key={loc.id} value={loc.name}>{loc.name} ({loc.address})</option>
                                      ))}
                                  </select>
                              </div>

                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                  <input 
                                    required
                                    name="subject"
                                    type="text" 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition-all"
                                    placeholder="How can we help?"
                                    value={contactForm.subject}
                                    onChange={e => setContactForm({...contactForm, subject: e.target.value})}
                                  />
                              </div>

                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                  <textarea 
                                    required
                                    name="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition-all resize-none"
                                    placeholder="Tell us more details..."
                                    value={contactForm.message}
                                    onChange={e => setContactForm({...contactForm, message: e.target.value})}
                                  />
                              </div>

                              <button 
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-200 disabled:opacity-70 flex items-center justify-center gap-2"
                              >
                                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                              </button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Franchise Tab Content */}
      {activeTab === 'franchise' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
              
              {/* Stats Bar */}
              <div className="bg-amber-400 py-12">
                  <div className="container mx-auto px-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                          {FRANCHISE_STATS.map((stat, idx) => (
                              <div key={idx} className="text-center">
                                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                  <div className="text-sm font-bold uppercase tracking-wider text-gray-800 opacity-70">{stat.label}</div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              <div className="container mx-auto px-4 py-16">
                  <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
                      
                      {/* Left: Info */}
                      <div className="lg:w-1/2">
                          <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2 block">Business Opportunity</span>
                          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join the Fastest Growing Pizza Brand</h2>
                          <div className="prose prose-lg text-gray-600 mb-8">
                              <p>
                                  Presto Pizza is more than just a restaurant; it's a proven business model built on quality, speed, and technology. 
                                  We provide our franchise partners with comprehensive training, marketing support, and a supply chain that ensures freshness every day.
                              </p>
                          </div>

                          <div className="space-y-6 mb-10">
                              {[
                                  { icon: TrendingUp, title: "High ROI Potential", desc: "Our efficient operations model maximizes profitability." },
                                  { icon: Users, title: "Dedicated Support", desc: "From site selection to grand opening and beyond." },
                                  { icon: Building, title: "Prime Territories Available", desc: "Secure your spot in high-growth markets today." }
                              ].map((item, idx) => (
                                  <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50 transition-colors">
                                      <div className="bg-white p-3 rounded-full shadow-sm text-amber-500 h-fit border border-gray-100">
                                          <item.icon size={24} />
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                                          <p className="text-sm text-gray-500">{item.desc}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>

                          <button className="flex items-center gap-2 text-red-600 font-bold hover:underline">
                              <Download size={20} /> Download Franchise Brochure (PDF)
                          </button>
                      </div>

                      {/* Right: Application Form */}
                      <div className="lg:w-1/2">
                          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 relative overflow-hidden">
                              {formStatus === 'success' ? (
                                  <div className="absolute inset-0 bg-gray-50 z-20 flex flex-col items-center justify-center text-center animate-in fade-in">
                                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                                          <CheckCircle size={48} />
                                      </div>
                                      <h3 className="text-3xl font-bold text-gray-900 mb-2">Inquiry Received!</h3>
                                      <p className="text-gray-500 max-w-xs">Our development team will review your information and contact you within 48 hours.</p>
                                  </div>
                              ) : null}

                              <div className="mb-6">
                                  <h3 className="text-2xl font-bold text-gray-900">Franchise Inquiry</h3>
                                  <p className="text-gray-500 text-sm">Fill out the form below to check availability in your area.</p>
                              </div>

                              <form onSubmit={handleFranchiseSubmit} className={`space-y-4 ${formStatus === 'submitting' ? 'opacity-50 pointer-events-none' : ''}`}>
                                  <div className="grid grid-cols-2 gap-4">
                                      <div>
                                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                                          <input 
                                            required
                                            name="name"
                                            type="text" 
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-400 outline-none bg-white"
                                            value={franchiseForm.name}
                                            onChange={e => setFranchiseForm({...franchiseForm, name: e.target.value})}
                                          />
                                      </div>
                                      <div>
                                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                                          <input 
                                            required
                                            name="phone"
                                            type="tel" 
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-400 outline-none bg-white"
                                            value={franchiseForm.phone}
                                            onChange={e => setFranchiseForm({...franchiseForm, phone: e.target.value})}
                                          />
                                      </div>
                                  </div>

                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                                      <input 
                                        required
                                        name="email"
                                        type="email" 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-400 outline-none bg-white"
                                        value={franchiseForm.email}
                                        onChange={e => setFranchiseForm({...franchiseForm, email: e.target.value})}
                                      />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                      <div>
                                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Liquid Capital</label>
                                          <select 
                                            required
                                            name="capital"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-400 outline-none bg-white appearance-none"
                                            value={franchiseForm.capital}
                                            onChange={e => setFranchiseForm({...franchiseForm, capital: e.target.value})}
                                          >
                                              <option value="">Select Range</option>
                                              <option value="<100k">&lt; $100k</option>
                                              <option value="100k-250k">$100k - $250k</option>
                                              <option value="250k-500k">$250k - $500k</option>
                                              <option value="500k+">$500k+</option>
                                          </select>
                                      </div>
                                      <div>
                                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Target Location</label>
                                          <input 
                                            required
                                            name="location"
                                            type="text" 
                                            placeholder="City, State"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-400 outline-none bg-white"
                                            value={franchiseForm.location}
                                            onChange={e => setFranchiseForm({...franchiseForm, location: e.target.value})}
                                          />
                                      </div>
                                  </div>

                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Business Experience</label>
                                      <textarea 
                                        required
                                        name="experience"
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-400 outline-none bg-white resize-none"
                                        placeholder="Briefly describe your background..."
                                        value={franchiseForm.experience}
                                        onChange={e => setFranchiseForm({...franchiseForm, experience: e.target.value})}
                                      />
                                  </div>

                                  <button 
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                  >
                                      {formStatus === 'submitting' ? 'Processing...' : 'Submit Inquiry'} <ArrowRight size={20} />
                                  </button>
                              </form>
                          </div>
                      </div>
                  </div>

                  {/* Process Steps */}
                  <div className="mt-20 border-t border-gray-200 pt-16">
                      <h2 className="text-3xl font-bold text-center mb-12">Path to Ownership</h2>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                          {FRANCHISE_STEPS.map((step, idx) => (
                              <div key={idx} className="relative text-center">
                                  {idx < FRANCHISE_STEPS.length - 1 && (
                                      <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                                  )}
                                  <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-gray-900 font-bold mx-auto mb-4 shadow-md">
                                      {idx + 1}
                                  </div>
                                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                                  <p className="text-xs text-gray-500">{step.desc}</p>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
