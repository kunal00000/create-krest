import express from "express";

import { userLogin, userSignup } from "../controllers/auth.controllers";

const router = express.Router();

router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);

// * The above code is equivalent to the following
// router.post("/signup", userSignup);
// router.post("/login", userLogin);

export default router;
