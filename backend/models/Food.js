const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    quantity: { type: Number, required: true },
    expiryDate: { type: Date },
    location: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    message: { type: String },

    type: {
      type: String,
      enum: ["veg", "nonveg", "drinks", "snacks", "celebration"],
      required: true,
    },

    ordered: {
      type: Boolean,
      default: false,
    },

    // ADD THIS
    image: {
      type: String,
      default: null,
    },

    cookedTime: { type: Date },
    consumeBy: { type: Date },
    allergens: { type: String },

    // user connection
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ADD THIS
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
