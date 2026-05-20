const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shopkeeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  deliveryCharge: { type: Number, default: 10 },
  totalAmount: { type: Number, required: true }, // price * quantity + deliveryCharge
  paymentMethod: { type: String, enum: ['COD', 'UPI'], required: true },
  status: { type: String, enum: ['placed', 'delivered'], default: 'placed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
