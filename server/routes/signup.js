const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt');
const User = require('../models/user'); 


router.post('/signup', async (req, res) => { 
  try {
    
    const { fullName, username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email or username already exists" });
    }

    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

   
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword 
    });

    
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });

  } catch (err) {
    console.error("Signup error:", err); 
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router; 