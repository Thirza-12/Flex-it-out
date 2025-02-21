const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference User model
  name: { type: String, required: true }, // Store username for leaderboard
  reps: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Workout", WorkoutSchema);
