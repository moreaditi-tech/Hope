const express = require("express");
const router = express.Router();
const Donate = require("../models/Donate");

/* -----------------------------
   ADD DONATION
------------------------------*/
router.post("/", async (req, res) => {
  try {
    const {
      foodName,
      quantity,
      expiryDate,
      location,
      description,
      category,
    } = req.body;

    const newDonate = new Donate({
      foodName,
      quantity,
      expiryDate,
      location,
      description,
      category,
      status: "available",
    });

    await newDonate.save();

    res.status(201).json({
      message: "Food donated successfully",
      data: newDonate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -----------------------------
   GET ALL DONATIONS
------------------------------*/
router.get("/", async (req, res) => {
  try {
    const donations = await Donate.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -----------------------------
   ORDER FOOD
------------------------------*/
router.put("/order/:id", async (req, res) => {
  try {
    const food = await Donate.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (food.status === "ordered") {
      return res.status(400).json({ message: "Food already ordered" });
    }

    food.status = "ordered";
    food.orderMessage = "Someone is coming to take the food";

    await food.save();

    res.status(200).json({
      message: "Order placed successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
