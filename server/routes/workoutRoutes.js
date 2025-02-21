const express = require("express");
const Workout = require("../models/Workout");
const User = require("../models/Users");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

// Save workout reps (User picked from token)
router.post("/save", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from token

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { reps } = req.body;
    if (reps === undefined) {
      return res.status(400).json({ message: "Reps are required" });
    }

    const workout = new Workout({
      user: user._id,
      name: user.name, // Store username
      reps,
    });

    await workout.save();
    res.status(201).json({ message: "Workout saved successfully!", workout });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));

const leaderboard = await Workout.aggregate([
  { $match: { timestamp: { $gte: oneWeekAgo } } }, // ✅ Use 'timestamp' instead of 'createdAt'
  { $group: { _id: "$name", totalReps: { $sum: "$reps" } } },
  { $sort: { totalReps: -1 } },
  { $limit: 10 }
]);

res.status(200).json(leaderboard);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
