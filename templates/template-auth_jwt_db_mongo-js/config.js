const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI
};
