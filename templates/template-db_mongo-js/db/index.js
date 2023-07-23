const mongoose = require("mongoose");

const { MONGO_URI } = require("../config");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.log("MongoDB connection FAIL: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
