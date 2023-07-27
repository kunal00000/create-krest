const { SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const userSignup = async (req, res) => {
  const newUser = req.body;
  const userExist = await User.findOne({ email: newUser.email });
  if (userExist) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const user = new User(newUser);
  await user.save();
  const token = jwt.sign({ email: newUser.email }, SECRET, {
    expiresIn: "1h" // token expires in 1 hour
  });
  return res.status(201).json({
    message: "User created successfully",
    data: user,
    token: token
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.headers;
  const user = await User.findOne({ email: email, password: password });
  if (user) {
    const token = jwt.sign({ email: user.email }, SECRET, {
      expiresIn: "1h"
    });
    res.status(200).json({ message: "User found", data: user, token: token });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  userSignup,
  userLogin
};
