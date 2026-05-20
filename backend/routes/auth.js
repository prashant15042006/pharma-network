const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register / Login with OTP (Customer)
router.post('/customer-login', async (req, res) => {
  const { phone, email, name } = req.body;
  try {
    let user = await User.findOne({ $or: [{ phone }, { email }] });
    if (!user) {
      user = new User({ role: 'customer', phone, email, name });
      await user.save();
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Shopkeeper Registration
router.post('/shopkeeper-register', async (req, res) => {
  const { phone, name, pin, upiBarcode } = req.body;
  try {
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ success: false, message: 'Shopkeeper already exists' });
    }
    user = new User({ role: 'shopkeeper', phone, name, pin, upiBarcode });
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Shopkeeper Login
router.post('/shopkeeper-login', async (req, res) => {
  const { phone, pin } = req.body;
  try {
    const user = await User.findOne({ phone, role: 'shopkeeper' });
    if (!user || user.pin !== pin) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
