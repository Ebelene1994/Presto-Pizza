
import React, { useState } from 'react';
import { 
    Briefcase, MapPin, Clock, DollarSign, 
    CheckCircle, Upload, X, ArrowRight, User
} from 'lucide-react';
import { JOBS, BENEFITS, EMPLOYEE_TESTIMONIALS } from '../data';
import { JobPosition } from '../types';

interface CareersProps {
  onNavigate: (page: string) => void;
}

export default function Careers({ onNavigate }: CareersProps) {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Form State
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      resume: null as File | null
  });

  const handleApply = (job: JobPosition) => {
      setSelectedJob(job);
      setIsModalOpen(true);
      setFormStatus('idle');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setFormData({ ...formData, resume: e.target.files[0] });
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormStatus('submitting');
      
      // Simulate API call
      setTimeout(() => {
          setFormStatus('success');
          // Reset after 2 seconds and close
          setTimeout(() => {
              setIsModalOpen(false);
              setFormData({ name: '', email: '', phone: '', resume: null });
          }, 2000);
      }, 1500);
  };

  return (
    <div className="bg-white animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
            Join the <span className="text-amber-400">Presto Family</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            We are more than just a pizza place. We are a team of passionate food lovers dedicated to delivering happiness, one slice at a time.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-amber-50">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Why Work With Us</span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2">Perks of the Job</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {BENEFITS.map((benefit, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-xl transition-all duration-300">
                          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                              <benefit.icon size={28} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Job Openings */}
      <section className="py-24 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                  <h2 className="text-3xl font-bold text-gray-900">Current Openings</h2>
                  <p className="text-gray-500 mt-2">Find the perfect role for your skills and passion.</p>
              </div>
              <div className="flex gap-2">
                  <span className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold">All</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-bold cursor-pointer transition-colors">Full-Time</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-bold cursor-pointer transition-colors">Part-Time</span>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {JOBS.map(job => (
                  <div key={job.id} className="border border-gray-100 rounded-2xl p-8 hover:border-red-200 hover:shadow-lg transition-all bg-white group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                          <Briefcase size={64} className="text-red-600" />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                    <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                                    <span className="flex items-center gap-1"><Clock size={14}/> {job.type}</span>
                                    <span className="flex items-center gap-1 font-semibold text-green-600"><DollarSign size={14}/> {job.salary}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">{job.description}</p>

                        <div className="mb-6">
                            <h4 className="font-bold text-sm uppercase text-gray-400 mb-2">Requirements</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {job.requirements.map((req, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle size={14} className="text-red-600 flex-shrink-0" /> {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button 
                            onClick={() => handleApply(job)}
                            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                            Apply Now <ArrowRight size={18} />
                        </button>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-16">Success Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {EMPLOYEE_TESTIMONIALS.map(t => (
                      <div key={t.id} className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm relative hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-4 mb-6">
                              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-amber-400" />
                              <div>
                                  <h4 className="font-bold text-lg">{t.name}</h4>
                                  <p className="text-amber-400 text-sm">{t.role}</p>
                              </div>
                          </div>
                          <p className="text-gray-300 italic">"{t.quote}"</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Application Modal */}
      {isModalOpen && selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
              <div className="bg-white rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                  <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                      <div>
                          <h3 className="text-xl font-bold text-gray-900">Apply for {selectedJob.title}</h3>
                          <p className="text-gray-500 text-sm">{selectedJob.location} • {selectedJob.type}</p>
                      </div>
                      <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                          <X size={24} className="text-gray-500" />
                      </button>
                  </div>
                  
                  <div className="p-8">
                      {formStatus === 'success' ? (
                          <div className="text-center py-12">
                              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                                  <CheckCircle size={40} />
                              </div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
                              <p className="text-gray-500">Thanks for applying. We'll be in touch shortly.</p>
                          </div>
                      ) : (
                          <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                      <div className="relative">
                                          <input 
                                            required
                                            type="text" 
                                            placeholder="Jane Doe" 
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                          />
                                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                      </div>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                      <input 
                                        required
                                        type="tel" 
                                        placeholder="(555) 000-0000" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                      />
                                  </div>
                              </div>
                              
                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                  <input 
                                    required
                                    type="email" 
                                    placeholder="jane@example.com" 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                  />
                              </div>

                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">Resume / CV</label>
                                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                      <input 
                                        type="file" 
                                        accept=".pdf,.doc,.docx"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                      />
                                      <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                                      {formData.resume ? (
                                          <p className="text-green-600 font-semibold">{formData.resume.name}</p>
                                      ) : (
                                          <div className="text-gray-500">
                                              <span className="text-red-600 font-bold hover:underline">Click to upload</span> or drag and drop
                                              <p className="text-xs mt-1">PDF, DOCX up to 5MB</p>
                                          </div>
                                      )}
                                  </div>
                              </div>

                              <div className="flex justify-end pt-4 border-t border-gray-100">
                                  <button 
                                    type="submit" 
                                    disabled={formStatus === 'submitting'}
                                    className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-200 disabled:opacity-70 flex items-center gap-2"
                                  >
                                      {formStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                                  </button>
                              </div>
                          </form>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
