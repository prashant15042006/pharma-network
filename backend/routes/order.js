const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Customer place order
router.post('/', async (req, res) => {
  try {
    const { customerId, shopkeeperId, medicineId, quantity, price, paymentMethod } = req.body;
    const deliveryCharge = 10;
    const totalAmount = (price * quantity) + deliveryCharge;

    const order = new Order({
      customerId,
      shopkeeperId,
      medicineId,
      quantity,
      price,
      deliveryCharge,
      totalAmount,
      paymentMethod
    });
    
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Shopkeeper get orders
router.get('/shopkeeper/:id', async (req, res) => {
  try {
    const orders = await Order.find({ shopkeeperId: req.params.id })
      .populate('customerId', 'name phone address location')
      .populate('medicineId', 'name imageUrl');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update order status (Shopkeeper marks as delivered)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
