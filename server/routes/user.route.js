import express from "express";
import { getPublishedImages, getUserDetails, loginUser, registerUser, userLogout } from "../controllers/user.controller.js";
import chectAuth from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", userLogout)
router.get("/getuser", chectAuth, getUserDetails)
router.get("/published-images", chectAuth,getPublishedImages)

export default router;