const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const donateRoutes = require("./routes/donateRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ ADD THIS

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI =
  "mongodb+srv://morerajaditi_db_user:94q1FKLgk86T1TFi@cluster0.rllct4v.mongodb.net/foodwaste?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });

// ✅ ROUTES
app.use("/api/donate", donateRoutes);
app.use("/api/auth", authRoutes); // ✅ ADD THIS

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
