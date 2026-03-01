const express = require("express");
const router = express.Router();
const multer = require("multer");

const User = require("../models/User");
const { signup, login } = require("../controllers/authController");

/* MULTER STORAGE */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* AUTH ROUTES */
router.post("/signup", signup);
router.post("/login", login);

/* UPLOAD AVATAR */
router.put("/avatar/:id", upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { avatar: req.file.filename },
      { new: true }
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("Avatar upload error:", err);
    res.status(500).json({ message: "Avatar upload failed" });
  }
});

module.exports = router;
