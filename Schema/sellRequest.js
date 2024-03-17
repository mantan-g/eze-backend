const mongoose = require('mongoose');
const SellRequest = mongoose.Schema(
  {
    deviceName: String,
    condition: String,
    capacity: String,
    cost: Number,
    currency: String,
  },
  { timestamps: true }
);

module.exports.SellRequest = mongoose.model('SellRequest', SellRequest);
