const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const donateRoutes = require("./routes/donateRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes"); // ADD THIS

const app = express();
const server = http.createServer(app);

/* SOCKET.IO */
const io = new Server(server, {
  cors: { origin: "*" },
});

const userSockets = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // REGISTER USER
  socket.on("register_user", (userId) => {
    userSockets.set(userId, socket.id);
    console.log(`Registered user ${userId} to socket ${socket.id}`);
  });

  socket.on("join_chat", (chatId) => socket.join(chatId));

  socket.on("send_message", ({ chatId, message, receiverId }) => {
    io.to(chatId).emit("receive_message", message);

    // NOTIFICATION LOGIC
    if (receiverId && userSockets.has(receiverId)) {
      const receiverSocketId = userSockets.get(receiverId);
      io.to(receiverSocketId).emit("notification", {
        type: "message",
        text: `New message from ${message.sender === "donor" ? "Donor" : "Receiver"}`,
        chatId,
      });
    }
  });

  socket.on("disconnect", () => {
    // optional: remove user from map
    console.log("User disconnected:", socket.id);
  });
});

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* SERVE UPLOADS */
app.use("/uploads", express.static("uploads"));

/* DB */
mongoose
  .connect("mongodb+srv://morerajaditi_db_user:94q1FKLgk86T1TFi@cluster0.rllct4v.mongodb.net/foodwaste?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB Connected");

    /* AUTOMATIC CLEANUP TASK (Every 10 Seconds for Debugging) */
    const Food = require("./models/Food");
    setInterval(async () => {
      try {
        const now = new Date();
        console.log(` Server Time: ${now.toISOString()} | Checking for expired food...`);

        const result = await Food.deleteMany({
          consumeBy: { $lt: now },
        });

        if (result.deletedCount > 0) {
          console.log(` Cleanup: Deleted ${result.deletedCount} expired food items.`);
        } else {
          // Optional: Log if nothing deleted to confirm it ran
          // console.log("No expired food found.");
        }
      } catch (err) {
        console.error("Cleanup Error:", err);
      }
    }, 10 * 1000); // 10 seconds
  })
  .catch((err) => console.error("MongoDB Error:", err));

/* ROUTES */
app.use("/api/donate", donateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes); //  VERY IMPORTANT
app.use("/api/review", reviewRoutes);
app.use("/api/volunteer", volunteerRoutes); // ADD THIS

/* START */
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
