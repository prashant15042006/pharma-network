import React, { useState } from 'react';
import { Settings, Plus, Package, IndianRupee, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ShopkeeperDashboard({ user, toggleTheme, isDark, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, orders, reports
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [medName, setMedName] = useState('');
  const [medPrice, setMedPrice] = useState('');
  const [medDiscount, setMedDiscount] = useState('0');

  const handleAddMedicine = (e) => {
    e.preventDefault();
    // API Call to add medicine
    alert('Medicine Added: ' + medName);
    setShowAddForm(false);
    setMedName(''); setMedPrice(''); setMedDiscount('0');
  };

  return (
    <div className="animate-fade-in flex flex-col min-h-screen">
      <header className="glass-header">
        <div>
          <h2 className="font-bold text-lg">Shop Dashboard</h2>
          <p className="text-xs text-gray">{user.name}</p>
        </div>
        <button onClick={() => navigate('/settings')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Settings size={24} className="text-primary-color" />
        </button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border-color)] bg-[var(--surface-color)] sticky top-[72px] z-10">
        <button 
          className={`flex-1 py-3 text-sm font-semibold text-center ${activeTab === 'inventory' ? 'text-primary-color border-b-2 border-primary-color' : 'text-gray'}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button 
          className={`flex-1 py-3 text-sm font-semibold text-center ${activeTab === 'orders' ? 'text-primary-color border-b-2 border-primary-color' : 'text-gray'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={`flex-1 py-3 text-sm font-semibold text-center ${activeTab === 'reports' ? 'text-primary-color border-b-2 border-primary-color' : 'text-gray'}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'inventory' && (
          <div>
            {!showAddForm ? (
              <button 
                onClick={() => setShowAddForm(true)}
                className="w-full card border-dashed border-2 border-primary-color flex flex-col items-center justify-center p-6 text-primary-color bg-teal-50/50 dark:bg-teal-900/10 cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/30 mb-4"
              >
                <Plus size={32} className="mb-2" />
                <span className="font-semibold">Upload New Medicine</span>
              </button>
            ) : (
              <div className="card mb-6">
                <h3 className="font-bold mb-4">Add Medicine</h3>
                <form onSubmit={handleAddMedicine} className="flex flex-col gap-3">
                  <input type="text" placeholder="Medicine Name" className="input-field" value={medName} onChange={(e) => setMedName(e.target.value)} required />
                  <div className="flex gap-3">
                    <input type="number" placeholder="Price (₹)" className="input-field flex-1" value={medPrice} onChange={(e) => setMedPrice(e.target.value)} required />
                    <input type="number" placeholder="Discount (%)" className="input-field flex-1" value={medDiscount} onChange={(e) => setMedDiscount(e.target.value)} />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button type="submit" className="btn flex-1">Save</button>
                    <button type="button" className="btn btn-secondary flex-1" onClick={() => setShowAddForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {/* Mock Inventory List */}
              <div className="card medicine-card">
                <img src="https://via.placeholder.com/60" alt="Med" />
                <div className="medicine-info">
                  <div className="medicine-name">Paracetamol 500mg</div>
                  <div className="flex gap-2 items-center">
                    <span className="medicine-price">₹19.00</span>
                    <span className="text-xs text-gray bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">5% off</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="flex flex-col gap-4">
            <div className="card">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">Order #1024</h4>
                  <p className="text-xs text-gray">Customer: Rahul Kumar</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-semibold">Pending</span>
              </div>
              <div className="border-t border-[var(--border-color)] py-2 my-2 flex items-center gap-2">
                <Package size={16} className="text-gray" />
                <span className="text-sm">2x Paracetamol 500mg</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">Payment: <strong className="text-primary-color">UPI</strong></span>
                <span className="font-bold">Total: ₹48.00</span>
              </div>
              <button className="btn w-full !py-2 text-sm bg-success-color hover:bg-emerald-600">
                Mark as Delivered
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid gap-4">
            <div className="card flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full text-blue-600 dark:text-blue-400">
                <Truck size={24} />
              </div>
              <div>
                <p className="text-sm text-gray">Medicines Delivered</p>
                <h3 className="text-xl font-bold">142</h3>
              </div>
            </div>
            
            <div className="card flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full text-green-600 dark:text-green-400">
                <IndianRupee size={24} />
              </div>
              <div>
                <p className="text-sm text-gray">Profit Earned</p>
                <h3 className="text-xl font-bold">₹4,250</h3>
              </div>
            </div>

            <div className="card flex items-center gap-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full text-purple-600 dark:text-purple-400">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm text-gray">Delivery Charges Collected</p>
                <h3 className="text-xl font-bold">₹1,420 <span className="text-xs font-normal">(@ ₹10/order)</span></h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
