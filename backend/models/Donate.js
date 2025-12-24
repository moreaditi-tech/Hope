const mongoose = require("mongoose");

const donateSchema = new mongoose.Schema(
  {
    foodName: String,
    quantity: String,
    expiryDate: String,
    location: String,
    description: String,
    category: String,

    status: {
      type: String,
      default: "available", // available | ordered
    },

    orderMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donate", donateSchema);
