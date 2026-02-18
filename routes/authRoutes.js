const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const loginLimiter = require("../middleware/rateLimiter");
const { validateRegister } = require("../middleware/validateInput");
const logger = require("../utils/logger");

const router = express.Router();

router.post("/register", validateRegister, async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password_hash: hashedPassword
  });

  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    logger("Failed login - user not found");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    logger("Failed login - wrong password");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { user_id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.json({ token });
});

module.exports = router;
