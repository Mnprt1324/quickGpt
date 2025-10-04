import express from "express";
import chectAuth from "../middlewares/auth.js";
import { createChat, deleteChat, getAllChats } from "../controllers/chat.controller.js";
const router = express.Router();

router.post("/create", chectAuth, createChat)
router.get("/get-chat", chectAuth, getAllChats)
router.post("/delete-chat", chectAuth, deleteChat)

export default router;