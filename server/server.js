const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Default Route
app.get("/", (req, res) => {
  res.send("Flex-It-Out Backend Running!");
});


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const workoutRoutes = require("./routes/workoutRoutes");
app.use("/api/workouts", workoutRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
