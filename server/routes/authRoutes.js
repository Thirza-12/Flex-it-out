const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth.js");
const User = require("../models/Users");

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// User Login
router.post("/login", async (req, res) => {
    try {
      console.log("Login Request:", req.body); // Debugging line
  
      const { email, password } = req.body;
  
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        console.log("User not found!");
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password mismatch!");
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  
    } catch (err) {
      console.error("Login Error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });
 
  // Fetch user profile
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Update user profile
router.put("/profile", verifyToken, async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        ).select("-password");
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Protected route example
router.get("/protected-route", verifyToken, (req, res) => {
    res.json({
      message: "Access granted",
      user: req.user, // Extracted from the token
    });
  });

module.exports = router;
