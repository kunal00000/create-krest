const mongoose = require("mongoose");

const { MONGODB_URI } = require("../config");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.log("MongoDB connection FAIL: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
