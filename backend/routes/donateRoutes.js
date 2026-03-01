const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addFood,
  getAllFood,
  getMyDonations,
} = require("../controllers/donateController");

const Food = require("../models/Food");

/* IMAGE UPLOAD */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* ADD FOOD */
router.post("/", upload.single("image"), addFood);

/* GET ALL FOOD */
router.get("/", getAllFood);

/* GET MY FOOD */
router.get("/my/:userId", getMyDonations);

/* DELETE FOOD */
router.delete("/:id", async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

/* GET SINGLE FOOD */
router.get("/find/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("userId", "name email");
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET MY ORDERED FOOD (Receiver) */
router.get("/myorders/:userId", async (req, res) => {
  try {
    const orders = await Food.find({ receiverId: req.params.userId })
      .populate("userId", "name email")
      .sort({ updatedAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("GET MY ORDERS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ORDER FOOD */
router.put("/order/:id", async (req, res) => {
  try {
    const { receiverId } = req.body; // Expect receiverId
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (food.ordered) {
      return res.status(400).json({ message: "Already ordered" });
    }

    food.ordered = true;
    if (receiverId) food.receiverId = receiverId; // Save Receiver

    await food.save();

    res.json({ message: "Order successful", food });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: `Order failed: ${err.message}` });
  }
});

module.exports = router;

