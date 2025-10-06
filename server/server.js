import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectionToDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import creditsRoute from "./routes/credits.route.js";
import { handleStripeWebhook } from "./controllers/webhooks.js";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectionToDB()

const PORT = process.env.PORT || 5000;


// app.post("/api/stripe", express.raw({ type: 'application/json' }), (req, res) => { console.log("appi called"); handleStripeWebhook(req, res) })
app.get("/", (req, res) => {
    res.send(`${process.env.GEMINI_API_KEY}Server is running!`);
});
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);
app.use("/api/credit", creditsRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});