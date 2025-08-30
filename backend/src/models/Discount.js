const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  validUntil: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
