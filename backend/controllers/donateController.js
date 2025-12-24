const Food = require("../models/Food");

// POST /api/donate
const addFood = async (req, res) => {
  try {
    const {
      foodName,
      quantity,
      expiryDate,
      location,
      message,
      type,
    } = req.body;

    if (!foodName || !quantity || !location || !type) {
      return res.status(400).json({
        message: "Food name, quantity, location and type are required",
      });
    }

    const food = new Food({
      foodName,
      quantity,
      expiryDate: expiryDate || null,
      location,
      message,
      type,
    });

    await food.save();

    res.status(201).json({
      success: true,
      message: "Food donated successfully",
      food,
    });
  } catch (error) {
    console.error("Add food error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/donate
const getAllFood = async (req, res) => {
  try {
    const food = await Food.find().sort({ createdAt: -1 });
    res.status(200).json(food);
  } catch (error) {
    console.error("Get food error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addFood,
  getAllFood,
};
