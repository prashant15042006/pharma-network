const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['customer', 'shopkeeper'],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  pin: { type: String }, // For shopkeepers
  address: { type: String },
  location: {
    lat: Number,
    lng: Number
  },
  upiBarcode: { type: String }, // For shopkeepers
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
