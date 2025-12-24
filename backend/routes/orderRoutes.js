const express = require("express");
const router = express.Router();
const {
  getAvailableFood,
  orderFood,
} = require("../controllers/orderController");

router.get("/", getAvailableFood);        // GET /api/order
router.post("/:id", orderFood);           // POST /api/order/:id

module.exports = router;
