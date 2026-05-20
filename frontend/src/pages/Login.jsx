import React, { useState } from 'react';
import { Pill, User, BuildingStorefront, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [role, setRole] = useState(null); // 'customer' or 'shopkeeper'
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API Call
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        role,
        phone,
        name: name || (role === 'customer' ? 'Customer User' : 'Shopkeeper User'),
      };
      onLogin(userData);
      setLoading(false);
    }, 1000);
  };

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 text-primary-color">
            <Pill size={64} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to Pharma Network</h1>
          <p className="text-gray">Your local medicine delivery app</p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <button 
            className="card w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setRole('customer')}
          >
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full text-primary-color">
                <User size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">I am a Customer</h3>
                <p className="text-sm text-gray">Order medicines online</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-gray" />
          </button>

          <button 
            className="card w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setRole('shopkeeper')}
          >
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full text-primary-color">
                <BuildingStorefront size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">I am a Shopkeeper</h3>
                <p className="text-sm text-gray">Sell medicines online</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-gray" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fade-in">
      <button 
        onClick={() => setRole(null)}
        className="self-start mb-6 text-primary-color flex items-center gap-2"
      >
        <span>← Back</span>
      </button>

      <div className="card w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-center">
          {role === 'customer' ? 'Customer Login' : 'Shopkeeper Login'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegistering && (
            <input 
              type="text" 
              placeholder="Full Name" 
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          
          <input 
            type="tel" 
            placeholder="Mobile Number" 
            className="input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          {role === 'shopkeeper' && (
            <input 
              type="password" 
              placeholder="4-digit PIN" 
              className="input-field"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          )}

          <button type="submit" className="btn mt-2" disabled={loading}>
            {loading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            type="button"
            className="text-primary-color text-sm underline"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
