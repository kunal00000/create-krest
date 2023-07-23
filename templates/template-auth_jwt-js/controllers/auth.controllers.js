const { SECRET } = require("../config");
const jwt = require("jsonwebtoken");

let Users = [
  {
    id: 1,
    email: "user1@example.com",
    password: "User1-password"
  }
];

const userSignup = (req, res) => {
  const newUser = req.body;
  userExist = Users.find((user) => user.email === newUser.email);
  if (userExist) {
    res.status(400).json({ message: "Email already exists" });
  } else {
    Users.push(newUser);
    const token = jwt.sign({ email: newUser.email }, SECRET, {
      expiresIn: "1h" // token expires in 1 hour
    });
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
      token: token
    });
  }
};

const userLogin = (req, res) => {
  const { email, password } = req.headers;
  const user = Users.find(
    (user) => user.email === email && user.password === password
  );
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
