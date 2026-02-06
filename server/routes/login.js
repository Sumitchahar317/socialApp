const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json("User not found");


    const jwt = require('jsonwebtoken'); 

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json("Invalid credentials");

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET , 
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful!", token, user: { username: user.username, email: user.email } });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router; 