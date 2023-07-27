const { SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>
    try {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication failed"
          });
        }
        req.user = decoded;
        next();
      });
    } catch (error) {
      return res.status(401).json({
        message: "Authentication failed"
      });
    }
  } else {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }
};

module.exports = authenticate;
