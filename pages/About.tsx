
import React from 'react';
import { 
  Heart, Clock, Users, Award, Star, 
  Calendar, ArrowRight, Quote 
} from 'lucide-react';
import { OrderInfo } from '../types';

interface AboutProps {
  onNavigate: (page: string) => void;
  onStartOrder: () => void;
}

export default function About({ onNavigate, onStartOrder }: AboutProps) {
  const critics = [
    { text: "The crust is simply perfection. A must-try for any pizza lover.", author: "Food Critic 1" },
    { text: "Fastest delivery in town without compromising quality.", author: "Food Critic 2" },
    { text: "Authentic Italian flavors that transport you straight to Naples.", author: "Food Critic 3" },
    { text: "Best gluten-free options I've ever tasted in a pizza chain.", author: "Daily Eats" },
    { text: "The truffle mushroom pizza is a gourmet masterpiece.", author: "The Gourmet Guide" },
    { text: "Consistent, fresh, and friendly service every single time.", author: "Neighborhood Bites" },
  ];

  return (
    <div className="bg-white animate-in fade-in duration-500">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          .pause-on-hover:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}
      </style>
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-red-600 text-white font-bold text-sm tracking-wide mb-6">
            Est. 1998
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
            Our Passion <br/> for <span className="text-amber-400">Perfect Pizza</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-0 max-w-2xl mx-auto">
            From a small family kitchen to your favorite local spot. This is the story of Presto Pizza.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="md:w-1/2">
                <div className="relative">
                    <img 
                        src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80" 
                        alt="Restaurant Interior" 
                        className="rounded-3xl shadow-2xl relative z-10"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400 rounded-full z-0"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-100 rounded-full z-0"></div>
                </div>
            </div>
            <div className="md:w-1/2">
                <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2 block">Our Story</span>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Family Owned Since Day One</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                        It all started in 1998 when the Rossi family decided to bring the authentic taste of Naples to the heart of New York. Nonna Maria’s secret dough recipe, fermented for 48 hours, became the foundation of everything we do.
                    </p>
                    <p>
                        We believe that great pizza isn't just food—it's an experience. That's why we still hand-stretch every dough ball, source our tomatoes from San Marzano, and use only 100% mozzarella di bufala.
                    </p>
                    <p className="font-semibold text-gray-900 italic border-l-4 border-red-600 pl-4 my-6">
                        "We don't cut corners. We cut fresh mozzarella."
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-amber-50 py-20 px-4">
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">We are committed to more than just making great food. We are committed to our community and our craft.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Heart, title: "Quality First", desc: "No freezers, no shortcuts. Just fresh ingredients delivered daily to our kitchens." },
                    { icon: Clock, title: "Speed & Service", desc: "We promise hot, fresh pizza in under 30 minutes, or it's on the house." },
                    { icon: Users, title: "Community", desc: "We are proud to support local schools, charities, and events in every neighborhood we serve." }
                ].map((val, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 mx-auto">
                            <val.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{val.title}</h3>
                        <p className="text-gray-500 text-center leading-relaxed">{val.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Meet The Team */}
      <section className="py-20 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet The Masters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="group text-center">
                  <div className="relative mb-6 overflow-hidden rounded-full w-64 h-64 mx-auto border-4 border-white shadow-xl">
                      <img 
                        src="https://img.freepik.com/premium-photo/business-woman-black-suit-white-background_564692-15944.jpg" 
                        alt="Founder" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Anna Rossi</h3>
                  <p className="text-red-600 font-semibold mb-2">Founder</p>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto">Carrying on the family tradition with a smile and a passion for perfect crust.</p>
              </div>
              <div className="group text-center">
                  <div className="relative mb-6 overflow-hidden rounded-full w-64 h-64 mx-auto border-4 border-white shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80" 
                        alt="Head Chef" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Elena Marco</h3>
                  <p className="text-red-600 font-semibold mb-2">Head Chef</p>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto">Master of flavors, blending tradition with modern culinary techniques.</p>
              </div>
          </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-3xl font-bold mb-16 text-center">Our Journey</h2>
              <div className="relative max-w-3xl mx-auto">
                  {/* Vertical Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700"></div>
                  
                  {[
                      { year: '1998', title: 'The Beginning', desc: 'First location opens in Brooklyn.' },
                      { year: '2005', title: 'Expansion', desc: 'Opened 3 new locations across NYC.' },
                      { year: '2015', title: 'Best Pizza Award', desc: 'Voted #1 Pizza in New York by City Magazine.' },
                      { year: '2024', title: 'Going Digital', desc: 'Launched our state-of-the-art mobile app.' }
                  ].map((item, idx) => (
                      <div key={idx} className={`relative flex items-center justify-between mb-12 ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                          <div className="w-5/12"></div>
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full border-4 border-gray-900 flex items-center justify-center z-10">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                              <span className="text-amber-400 font-bold text-xl block mb-1">{item.year}</span>
                              <h4 className="font-bold text-lg">{item.title}</h4>
                              <p className="text-gray-400 text-sm">{item.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
      </section>

      {/* Awards & Press */}
      <section className="py-24 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 text-center mb-16">
              <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Recognition</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Awards & Mentions</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-20 px-4">
              {[
                  { title: "Best Pizza 2024", sub: "City Guide" },
                  { title: "Gold Spoon", sub: "Culinary Excellence" },
                  { title: "Readers Choice", sub: "NY Times" },
                  { title: "Fastest Delivery", sub: "Foodie Awards" }
              ].map((award, idx) => (
                  <div key={idx} className="bg-white px-8 py-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow">
                      <Award size={32} className="text-amber-400 mb-3" />
                      <div className="font-bold text-gray-900">{award.title}</div>
                      <div className="text-xs text-gray-500">{award.sub}</div>
                  </div>
              ))}
          </div>

          {/* Continuous Sliding Quote Section */}
          <div className="relative w-full overflow-hidden pause-on-hover py-4">
              {/* Fade masks */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
              
              <div className="animate-marquee">
                  {[...critics, ...critics].map((critic, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white p-8 rounded-2xl shadow-sm italic text-gray-600 border border-gray-100 mx-4 w-[350px] shrink-0 relative flex flex-col justify-between"
                      >
                          <Quote className="text-red-100 absolute top-4 left-4 transform -scale-x-100" size={48} />
                          <p className="relative z-10 pl-4 text-lg mb-4">"{critic.text}"</p>
                          <div className="font-bold text-gray-900 not-italic text-sm text-right mt-auto">- {critic.author}</div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-red-600 text-white text-center">
          <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-6">Ready to Taste the Difference?</h2>
              <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">Join thousands of happy customers and experience the best pizza in town.</p>
              <button 
                  onClick={onStartOrder}
                  className="bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-transform hover:scale-105 shadow-xl flex items-center gap-2 mx-auto"
              >
                  Order Now <ArrowRight />
              </button>
          </div>
      </section>
    </div>
  );
}
