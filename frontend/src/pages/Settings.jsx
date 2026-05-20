import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, LogOut, User, MapPin, Receipt, Shield, Bell } from 'lucide-react';

export default function Settings({ user, toggleTheme, isDark, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="animate-fade-in flex flex-col min-h-screen">
      <header className="glass-header">
        <button onClick={() => navigate(-1)} className="flex items-center text-primary-color gap-1">
          <ArrowLeft size={20} /> Back
        </button>
        <h2 className="font-bold">Settings</h2>
        <div style={{ width: 60 }}></div>
      </header>

      <div className="flex-1 p-4 pb-20">
        
        {/* Profile Card */}
        <div className="card mb-6 flex items-center gap-4">
          <div className="bg-primary-color text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-bold text-lg">{user?.name || 'User'}</h3>
            <p className="text-gray text-sm">{user?.phone || '+91 XXXXXXXXXX'}</p>
            <p className="text-xs text-primary-color mt-1 font-semibold uppercase">{user?.role}</p>
          </div>
        </div>

        <h4 className="font-bold mb-3 text-sm text-gray px-2">App Settings</h4>
        <div className="card mb-6 p-0 divide-y divide-[var(--border-color)]">
          <button 
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleTheme}
          >
            <div className="flex items-center gap-3">
              {isDark ? <Moon size={20} className="text-gray" /> : <Sun size={20} className="text-gray" />}
              <span className="font-semibold">Appearance</span>
            </div>
            <span className="text-sm text-gray">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray" />
              <span className="font-semibold">Notifications</span>
            </div>
          </button>
        </div>

        <h4 className="font-bold mb-3 text-sm text-gray px-2">Account</h4>
        <div className="card mb-6 p-0 divide-y divide-[var(--border-color)]">
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <User size={20} className="text-gray" />
            <span className="font-semibold">Edit Profile</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <MapPin size={20} className="text-gray" />
            <span className="font-semibold">Manage Addresses</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Receipt size={20} className="text-gray" />
            <span className="font-semibold">Order History</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Shield size={20} className="text-gray" />
            <span className="font-semibold">Privacy Policy</span>
          </button>
        </div>

        <button 
          className="w-full card border border-danger-color text-danger-color flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="font-bold">Logout</span>
        </button>

        <div className="text-center mt-6">
          <p className="text-xs text-gray">Pharma Network v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
