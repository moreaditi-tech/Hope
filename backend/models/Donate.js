const mongoose = require("mongoose");

const donateSchema = new mongoose.Schema(
  {
    foodName: String,
    quantity: String,

    // CHANGE THIS to Date (for auto-expiry)
    expiryDate: {
      type: Date,
      required: true,
    },

    location: String,
    description: String,
    category: String,

    // IMAGE FIELD
    image: {
      type: String, // stores image filename
    },

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
