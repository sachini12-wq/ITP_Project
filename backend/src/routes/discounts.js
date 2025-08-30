const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');
const { auth, isAdmin } = require('../middleware/auth');

// Get all discounts (admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new discount (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { code, percentage, validUntil } = req.body;
    const discount = new Discount({
      code,
      percentage,
      validUntil
    });
    await discount.save();
    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update discount (admin only)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { code, percentage, validUntil, active } = req.body;
    const discount = await Discount.findById(req.params.id);

    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }

    discount.code = code || discount.code;
    discount.percentage = percentage || discount.percentage;
    discount.validUntil = validUntil || discount.validUntil;
    discount.active = active !== undefined ? active : discount.active;

    await discount.save();
    res.json(discount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete discount (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
