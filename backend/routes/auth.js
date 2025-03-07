const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: "Error creating user." });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) throw new Error();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ data: { user, token }, message: "Login Successful" });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ error: "Invalid credentials." });
  }
});

module.exports = router;
