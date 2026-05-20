import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Checkout({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const medicine = location.state?.medicine;

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // COD or UPI
  const [isSuccess, setIsSuccess] = useState(false);

  if (!medicine) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-screen">
        <p>No medicine selected</p>
        <button className="btn mt-4" onClick={() => navigate('/customer')}>Go Back</button>
      </div>
    );
  }

  const basePrice = medicine.price - (medicine.price * (medicine.discount/100));
  const deliveryCharge = 10;
  const total = (basePrice * quantity) + deliveryCharge;

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/customer');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fade-in text-center">
        <CheckCircle2 size={64} className="text-success-color mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
        <p className="text-gray mb-6">Your medicine will be delivered shortly.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in flex flex-col min-h-screen">
      <header className="glass-header">
        <button onClick={() => navigate(-1)} className="flex items-center text-primary-color gap-1">
          <ArrowLeft size={20} /> Back
        </button>
        <h2 className="font-bold">Checkout</h2>
        <div style={{ width: 60 }}></div>
      </header>

      <div className="flex-1 p-4 pb-20">
        <div className="card mb-4 flex gap-4 items-center">
          <img src={medicine.imageUrl} alt={medicine.name} className="w-16 h-16 rounded-xl object-cover" />
          <div className="flex-1">
            <h3 className="font-bold">{medicine.name}</h3>
            <p className="text-primary-color font-semibold">₹{basePrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="card mb-4">
          <h4 className="font-bold mb-3 text-sm">Quantity</h4>
          <div className="flex items-center gap-4">
            <button 
              className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-xl"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >-</button>
            <span className="font-bold text-lg w-8 text-center">{quantity}</span>
            <button 
              className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-xl bg-gray-50 dark:bg-gray-800"
              onClick={() => setQuantity(quantity + 1)}
            >+</button>
          </div>
        </div>

        <div className="card mb-4">
          <h4 className="font-bold mb-3 text-sm">Delivery Details</h4>
          <div className="text-sm space-y-1">
            <p><span className="text-gray">Name:</span> {user?.name}</p>
            <p><span className="text-gray">Phone:</span> {user?.phone || '+91 XXXXXXXXXX'}</p>
            <p><span className="text-gray">Location:</span> Live Location Shared 📍</p>
          </div>
        </div>

        <div className="card mb-4">
          <h4 className="font-bold mb-3 text-sm">Payment Method</h4>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 p-3 border border-[var(--border-color)] rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
              <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="accent-primary-color w-4 h-4" />
              <span className="font-semibold">UPI (PhonePe, GPay)</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-[var(--border-color)] rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
              <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-primary-color w-4 h-4" />
              <span className="font-semibold">Cash on Delivery (COD)</span>
            </label>
          </div>

          {paymentMethod === 'UPI' && (
            <div className="mt-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex flex-col items-center text-center">
              <p className="text-sm font-semibold mb-2">Scan Shopkeeper's Barcode to Pay</p>
              <div className="bg-white p-2 rounded-lg">
                {/* Mock QR Code */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay" alt="UPI QR" className="w-32 h-32" />
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h4 className="font-bold mb-3 text-sm">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray">Item Total</span>
              <span>₹{(basePrice * quantity).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">Delivery Charge</span>
              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="border-t border-[var(--border-color)] pt-2 mt-2 flex justify-between font-bold text-lg">
              <span>Total Pay</span>
              <span className="text-primary-color">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-[var(--surface-color)] border-t border-[var(--border-color)] z-20">
          <button onClick={handleCheckout} className="btn w-full">
            Confirm Order • ₹{total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
