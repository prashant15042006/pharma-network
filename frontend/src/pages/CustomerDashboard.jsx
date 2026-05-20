import React, { useState } from 'react';
import { Search, Settings, ShoppingBag, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard({ user, toggleTheme, isDark, onLogout }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  // Mock medicines
  const medicines = [
    { id: 1, name: 'Paracetamol 500mg', price: 20, discount: 5, imageUrl: 'https://via.placeholder.com/60', shop: 'City Pharmacy' },
    { id: 2, name: 'Amoxicillin 250mg', price: 45, discount: 10, imageUrl: 'https://via.placeholder.com/60', shop: 'Health Plus' },
    { id: 3, name: 'Vitamin C', price: 30, discount: 0, imageUrl: 'https://via.placeholder.com/60', shop: 'Care Meds' },
  ];

  const filteredMeds = medicines.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in flex flex-col min-h-screen">
      <header className="glass-header">
        <div>
          <h2 className="font-bold text-lg">Hi, {user.name}</h2>
          <p className="text-xs flex items-center gap-1 text-gray">
            <MapPin size={12} /> Set your location
          </p>
        </div>
        <button onClick={() => navigate('/settings')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Settings size={24} className="text-primary-color" />
        </button>
      </header>

      <div className="search-container">
        <div className="search-bar">
          <Search size={20} className="text-gray" />
          <input 
            type="text" 
            placeholder="Search for medicines..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <h3 className="font-semibold mb-4 text-gray">Available Medicines</h3>
        
        {filteredMeds.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredMeds.map(med => {
              const finalPrice = med.price - (med.price * (med.discount/100));
              return (
                <div key={med.id} className="card medicine-card">
                  <img src={med.imageUrl} alt={med.name} />
                  <div className="medicine-info">
                    <div className="medicine-name">{med.name}</div>
                    <div className="text-xs text-gray mb-1">Sold by: {med.shop}</div>
                    <div className="flex items-center gap-2">
                      <span className="medicine-price">₹{finalPrice.toFixed(2)}</span>
                      {med.discount > 0 && (
                        <span className="text-xs text-gray line-through">₹{med.price}</span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/checkout', { state: { medicine: med } })}
                    className="btn !py-1.5 !px-4 text-sm"
                  >
                    Buy
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 text-gray">
            <ShoppingBag size={48} className="opacity-50 mb-2" />
            <p>Medicine Not Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
