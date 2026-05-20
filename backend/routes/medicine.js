const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Get all medicines (for Customer dashboard)
router.get('/', async (req, res) => {
  try {
    const search = req.query.search;
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: 'i' } };
    }
    const medicines = await Medicine.find(query).populate('shopkeeperId', 'name phone address upiBarcode location');
    res.json({ success: true, medicines });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get medicines by shopkeeper
router.get('/shopkeeper/:id', async (req, res) => {
  try {
    const medicines = await Medicine.find({ shopkeeperId: req.params.id });
    res.json({ success: true, medicines });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new medicine (Shopkeeper)
router.post('/', async (req, res) => {
  try {
    const { shopkeeperId, name, price, discount, imageUrl } = req.body;
    const medicine = new Medicine({ shopkeeperId, name, price, discount, imageUrl });
    await medicine.save();
    res.json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
