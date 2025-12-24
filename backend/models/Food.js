const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    quantity: { type: Number, required: true },
    expiryDate: { type: Date },
    location: { type: String, required: true },
    message: { type: String },
    type: {
      type: String,
      enum: ["veg", "nonveg", "drinks", "snacks", "celebration"],
      required: true,
    },
    ordered: {
      type: Boolean,
      default: false, // 👈 VERY IMPORTANT
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
