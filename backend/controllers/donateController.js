const Food = require("../models/Food");

/* ================= ADD FOOD ================= */
/* POST /api/donate */
const addFood = async (req, res) => {
  try {
    const { foodName, quantity, expiryDate, location, message, type, userId } =
      req.body;

    // validation
    if (!foodName || !quantity || !location || !type || !userId) {
      return res.status(400).json({
        message: "Food name, quantity, location, type and userId are required",
      });
    }

    // get uploaded image filename (if exists)
    const image = req.file ? req.file.filename : null;

    const { cookedTime, consumeBy, allergens, latitude, longitude } = req.body;

    // Helper to clean FormData strings
    const cleanDate = (d) => (d && d !== "null" && d !== "" ? d : null);
    const cleanNumber = (n) => (n && n !== "null" && n !== "" && !isNaN(n) ? Number(n) : null);

    const food = new Food({
      foodName,
      quantity,
      expiryDate: cleanDate(expiryDate),
      location,
      message,
      type,
      userId,
      image, // save image in DB
      cookedTime: cleanDate(cookedTime),
      consumeBy: cleanDate(consumeBy),
      allergens: allergens || "",
      latitude: cleanNumber(latitude),
      longitude: cleanNumber(longitude),
    });

    await food.save();

    return res.status(201).json({
      success: true,
      message: "Food donated successfully",
      food,
    });
  } catch (error) {
    console.error("ADD FOOD ERROR →", error);
    console.error("Request Body:", req.body);
    // Return specific error message for debugging
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

/* ================= GET ALL FOOD ================= */
/* GET /api/donate */
const getAllFood = async (req, res) => {
  try {
    // Filter: ordered is false AND (consumeBy is null OR consumeBy > now)
    const foods = await Food.find({
      ordered: false,
      $or: [
        { consumeBy: { $eq: null } },
        { consumeBy: { $gt: new Date() } }
      ]
    }).sort({ createdAt: -1 })
      .populate("userId", "name email"); // POPULATE DONOR INFO

    return res.status(200).json(foods);
  } catch (error) {
    console.error("GET ALL FOOD ERROR →", error);
    return res.status(500).json({ message: "Server error while fetching food" });
  }
};

/* ================= GET MY DONATIONS ================= */
/* GET /api/donate/my/:userId */
const getMyDonations = async (req, res) => {
  try {
    const { userId } = req.params;

    const myFoods = await Food.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(myFoods);
  } catch (error) {
    console.error("GET MY DONATIONS ERROR →", error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

module.exports = {
  addFood,
  getAllFood,
  getMyDonations,
};
