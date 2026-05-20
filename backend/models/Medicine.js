const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  shopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Pre-save hook to calculate final price
medicineSchema.pre('save', function(next) {
  if (this.discount > 0) {
    this.finalPrice = this.price - (this.price * (this.discount / 100));
  } else {
    this.finalPrice = this.price;
  }
  next();
});

module.exports = mongoose.model('Medicine', medicineSchema);
