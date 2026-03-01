const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

/* ================= START CHAT ================= */
router.post("/start", async (req, res) => {
  try {
    const { foodId, donorId, receiverId } = req.body;

    if (!foodId || !donorId || !receiverId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let chat = await Chat.findOne({ foodId });

    if (!chat) {
      chat = await Chat.create({
        foodId,
        donorId,
        receiverId,
        messages: [],
      });
    }

    res.json(chat);
  } catch (err) {
    console.error("START CHAT ERROR:", err);
    res.status(500).json({ message: "Chat start failed" });
  }
});

/* ================= GET CHAT BY FOOD ================= */
router.get("/:foodId", async (req, res) => {
  try {
    const chat = await Chat.findOne({ foodId: req.params.foodId })
      .populate("messages.sender", "name avatar");

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.json(chat);
  } catch (err) {
    console.error("GET CHAT ERROR:", err);
    res.status(500).json({ message: "Get chat failed" });
  }
});

/* ================= SEND MESSAGE ================= */
router.post("/send", async (req, res) => {
  try {
    const { foodId, senderId, text } = req.body;

    if (!foodId || !senderId || !text) {
      return res.status(400).json({ message: "Missing message data" });
    }

    const chat = await Chat.findOne({ foodId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({
      sender: senderId,
      text,
      createdAt: new Date(),
    });

    await chat.save();

    const updatedChat = await Chat.findById(chat._id)
      .populate("messages.sender", "name avatar");

    res.json(updatedChat);
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    res.status(500).json({ message: "Send failed" });
  }
});

/* ================= DONOR CHATS ================= */
router.get("/donor/:donorId", async (req, res) => {
  try {
    const chats = await Chat.find({ donorId: req.params.donorId })
      .populate("receiverId", "name email")
      .populate("foodId", "foodName");

    res.json(chats);
  } catch (err) {
    console.error("DONOR CHATS ERROR:", err);
    res.status(500).json({ message: "Failed to load donor chats" });
  }
});

/* ================= RECEIVER CHATS FINAL FIX ================= */
router.get("/receiver/:receiverId", async (req, res) => {
  try {
    const chats = await Chat.find({ receiverId: req.params.receiverId })
      .populate("donorId", "name email")
      .populate("foodId", "foodName");

    res.json(chats);
  } catch (err) {
    console.error("RECEIVER CHATS ERROR:", err);
    res.status(500).json({ message: "Failed to load receiver chats" });
  }
});

module.exports = router;
