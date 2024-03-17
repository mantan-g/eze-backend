const mongoose = require("mongoose");

const BuyRequest = mongoose.Schema(
  {
    deviceName: String,
    condition: String,
    capacity: String,
    cost: Number,
    currency: String,
  },
  { timestamps: true }
);

module.exports.BuyRequest = mongoose.model("BuyRequests", BuyRequest);
