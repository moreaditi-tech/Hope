const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const User = require("../models/User");

// ADD REVIEW
router.post("/add", async (req, res) => {
    try {
        const { reviewerId, recipientId, rating, comment } = req.body;

        const review = await Review.create({
            reviewerId,
            recipientId,
            rating,
            comment,
        });

        // UPDATE USER AVERAGE
        const reviews = await Review.find({ recipientId });
        const totalStars = reviews.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = totalStars / reviews.length;

        await User.findByIdAndUpdate(recipientId, {
            averageRating: averageRating.toFixed(1),
            reviewCount: reviews.length,
        });

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: "Error adding review" });
    }
});

// GET USER REVIEWS
router.get("/:userId", async (req, res) => {
    try {
        const reviews = await Review.find({ recipientId: req.params.userId })
            .populate("reviewerId", "name")
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error fetching reviews" });
    }
});

module.exports = router;
