
import React, { useState, useEffect } from 'react';
import { 
    MapPin, Search, Navigation, Phone, Clock, 
    Filter, Star, CheckCircle, ArrowRight, X, Loader2
} from 'lucide-react';
import { LOCATIONS } from '../data';
import { StoreLocation, OrderInfo } from '../types';

interface LocationsProps {
  onStartOrder: (info: OrderInfo) => void;
  selectedStoreId?: string;
  onSetStore: (id: string) => void;
}

export default function Locations({ onStartOrder, selectedStoreId, onSetStore }: LocationsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<StoreLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const filters = ['All', 'Open Now', 'Dine-In', 'Drive-Thru'];

  const filteredLocations = LOCATIONS.filter(loc => {
      const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            loc.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeFilter === 'All') return matchesSearch;
      if (activeFilter === 'Open Now') return matchesSearch; // In a real app, check business hours
      if (activeFilter === 'Dine-In') return matchesSearch && loc.features.includes('Dine-In');
      if (activeFilter === 'Drive-Thru') return matchesSearch && loc.features.includes('24/7 Drive-Thru');
      return matchesSearch;
  });

  const handleOrderHere = (loc: StoreLocation) => {
      onStartOrder({
          method: 'pickup',
          storeId: loc.id,
          contact: { name: '', phone: '', email: '' } 
      });
  };

  const openHoursModal = (loc: StoreLocation) => {
      setSelectedLocation(loc);
      setModalOpen(true);
  };

  const handleUseMyLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mocking a location search based on coordinates
        // In a real app, you'd call a reverse geocoding API or calculate distances
        setTimeout(() => {
          setSearchQuery("New York"); // Simulate finding the user in NY
          setIsLocating(false);
        }, 1500);
      },
      (error) => {
        setLocationError("Unable to retrieve your location.");
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
        
      {/* Hero Map Section */}
      <section className="relative h-[60vh] bg-gray-900 w-full">
        {/* Static Map Placeholder */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-80 overflow-hidden"
            style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-74.006,40.7128,12,0/1200x600?access_token=pk.mock')` }} 
        >
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
             <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Find Your Nearest Presto</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">
                Fresh pizza is just around the corner. Locate a store near you for fast delivery or pickup.
            </p>
        </div>

        {/* Search Overlay - Fully Functional */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 container mx-auto z-20">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center border border-amber-100">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Enter zip code, city, or street..." 
                        className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none text-gray-700 font-semibold transition-all placeholder:text-gray-400 shadow-inner"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all"
                      >
                        <X size={18} />
                      </button>
                    )}
                </div>
                <button 
                  onClick={handleUseMyLocation}
                  disabled={isLocating}
                  className={`px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all whitespace-nowrap w-full md:w-auto justify-center shadow-lg active:scale-95 ${
                    isLocating 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-900 text-white hover:bg-red-600 hover:shadow-red-200'
                  }`}
                >
                    {isLocating ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Navigation size={20} />
                    )}
                    {isLocating ? 'Locating...' : 'Use My Location'}
                </button>
            </div>
            {locationError && (
              <p className="text-center mt-2 text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-1">{locationError}</p>
            )}
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-48 pb-20">
        
        {/* Header and Result Count */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-100 pb-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-gray-900">Available Stores</h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                Showing {filteredLocations.length} locations {searchQuery && `near "${searchQuery}"`}
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                            activeFilter === filter 
                            ? 'bg-red-600 text-white shadow-xl shadow-red-100' 
                            : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLocations.map(loc => (
                  <div key={loc.id} className={`bg-white rounded-[2rem] shadow-sm border overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col group ${selectedStoreId === loc.id ? 'border-amber-400 ring-4 ring-amber-50' : 'border-gray-100'}`}>
                      {/* Image Header */}
                      <div className="h-56 relative overflow-hidden">
                          <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
                              <Navigation size={14} className="text-red-600" />
                              {loc.distance}
                          </div>
                          
                          {selectedStoreId === loc.id && (
                              <div className="absolute top-4 left-4 bg-amber-400 text-gray-900 px-4 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
                                  <Star size={14} className="fill-gray-900" />
                                  MY FAVORITE
                              </div>
                          )}
                      </div>

                      {/* Content */}
                      <div className="p-8 flex-1 flex flex-col">
                          <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-red-600 transition-colors">{loc.name}</h3>
                          
                          <div className="space-y-4 text-sm font-medium text-gray-500 mb-8">
                              <div className="flex items-start gap-4">
                                  <div className="bg-red-50 p-2 rounded-xl text-red-600 shrink-0">
                                    <MapPin size={18} />
                                  </div>
                                  <span className="leading-relaxed">{loc.address}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                  <div className="bg-red-50 p-2 rounded-xl text-red-600 shrink-0">
                                    <Phone size={18} />
                                  </div>
                                  <a href={`tel:${loc.phone}`} className="hover:text-red-600 font-bold transition-colors">{loc.phone}</a>
                              </div>
                              <button 
                                  onClick={() => openHoursModal(loc)}
                                  className="flex items-center gap-4 hover:text-red-600 transition-colors w-full text-left"
                              >
                                  <div className="bg-red-50 p-2 rounded-xl text-red-600 shrink-0">
                                    <Clock size={18} />
                                  </div>
                                  <span className="font-bold border-b-2 border-dashed border-gray-200 hover:border-red-200">View Hours & Details</span>
                              </button>
                          </div>

                          {/* Features Tags */}
                          <div className="flex flex-wrap gap-2 mb-8">
                              {loc.features.map((feature, idx) => (
                                  <span key={idx} className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-gray-100">
                                      {feature}
                                  </span>
                              ))}
                          </div>

                          {/* Actions */}
                          <div className="mt-auto space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                  <button className="bg-gray-50 text-gray-700 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95 border border-gray-100">
                                      Directions
                                  </button>
                                  {selectedStoreId === loc.id ? (
                                      <button 
                                          disabled
                                          className="bg-green-50 text-green-600 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-default border border-green-100"
                                      >
                                          <CheckCircle size={16} /> Favorite
                                      </button>
                                  ) : (
                                      <button 
                                          onClick={() => onSetStore(loc.id)}
                                          className="bg-amber-50 text-amber-800 hover:bg-amber-100 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 border border-amber-100"
                                      >
                                          Set Favorite
                                      </button>
                                  )}
                              </div>
                              <button 
                                  onClick={() => handleOrderHere(loc)}
                                  className="w-full bg-red-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-red-100 active:scale-[0.98] group"
                              >
                                  Order Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">No Stores Found</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">We couldn't find any stores matching your search. Try a different city or zip code.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Hours Modal */}
      {modalOpen && selectedLocation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setModalOpen(false)}></div>
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                <div className="h-2 bg-red-600"></div>
                <button 
                    onClick={() => setModalOpen(false)}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 z-20"
                >
                    <X size={24} />
                </button>
                
                <div className="p-10">
                    <h3 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{selectedLocation.name}</h3>
                    <p className="text-gray-500 mb-10 flex items-start gap-2 font-medium">
                        <MapPin size={18} className="text-red-500 shrink-0 mt-0.5" /> {selectedLocation.address}
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="text-red-600" size={24} />
                          <h4 className="font-black text-xs uppercase tracking-[0.3em] text-gray-400">Business Hours</h4>
                        </div>
                        <div className="space-y-3 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-gray-900">Mon - Thu</span>
                                <span className="text-gray-600 font-medium">10:00 AM - 10:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-gray-900">Fri - Sat</span>
                                <span className="text-gray-600 font-medium bg-red-50 text-red-600 px-2 py-0.5 rounded font-black text-[10px]">LATE NIGHT</span>
                                <span className="text-gray-600 font-medium">10:00 AM - 12:00 AM</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-gray-900">Sunday</span>
                                <span className="text-gray-600 font-medium">11:00 AM - 10:00 PM</span>
                            </div>
                        </div>

                        <div className="pt-8">
                             <h4 className="font-black text-xs uppercase tracking-[0.3em] text-gray-400 mb-4 flex items-center gap-3">
                                <Star size={18} className="text-amber-400" /> Store Amenities
                             </h4>
                             <div className="flex flex-wrap gap-2">
                                {selectedLocation.features.map((f, i) => (
                                    <span key={i} className="bg-white text-gray-600 border border-gray-100 px-4 py-2 rounded-2xl text-xs font-bold shadow-sm">
                                        {f}
                                    </span>
                                ))}
                             </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => { setModalOpen(false); handleOrderHere(selectedLocation); }}
                        className="w-full mt-10 bg-red-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-100 hover:bg-red-700 transition-all active:scale-95"
                    >
                        Order from this Store
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
