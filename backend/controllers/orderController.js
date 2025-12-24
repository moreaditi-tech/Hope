const Food = require("../models/Food");

// GET available food (not ordered)
const getAvailableFood = async (req, res) => {
  try {
    const food = await Food.find({ ordered: false }).sort({ createdAt: -1 });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ORDER food
const orderFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    food.ordered = true;
    await food.save();

    res.status(200).json({ message: "Food ordered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAvailableFood,
  orderFood,
};
