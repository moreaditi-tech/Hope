const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// GET ALL AVAILABLE PICKUPS (Tasks)
router.get("/tasks", async (req, res) => {
    try {
        // food that is NOT ordered yet (or maybe ordered but needs pickup?)
        // For simplicity: Volunteers see ALL available food to help transport
        const tasks = await Food.find({ ordered: false }).populate(
            "userId",
            "name email"
        );
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

module.exports = router;
