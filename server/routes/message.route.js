import express from "express";
import { ImageMessageGen, textMessageGen } from "../controllers/message.controller.js";
import chectAuth from "../middlewares/auth.js"
const router = express.Router();

router.post("/text", chectAuth, textMessageGen)
router.post("/image", chectAuth, ImageMessageGen)

export default router