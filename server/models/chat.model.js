import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    useName: { type: String, required: true },
    name: { type: String, required: true },
    message: [{
        isImage: { type: Boolean, default: true },
        isPublished: { type: Boolean, default: false },
        role: { type: String, required: true },
        content: { type: String, required: true },
        timestamps: { type: Number, required: true }
    }]

}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;