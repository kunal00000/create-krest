const express = require("express");
const { userSignup, userLogin } = require("../controllers/auth.controllers");

const router = express.Router();

router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);

// * The above code is equivalent to the following
// router.post("/signup", userSignup);
// router.post("/login", userLogin);

module.exports = router;
