import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
//create chat controller
export const createChat = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const chatdata = {
            userId,
            message: [],
            name: "New Chat",
            useName: user.name
        }
        const chat = new Chat(chatdata);
        await chat.save();
        res.status(201).json({ success: true, chat, message: "Chat created successfully" })
    } catch (error) {
        console.log("Error in creating chat", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// get all chats controller
export const getAllChats = async (req, res) => {
    try {
        const userId = req.id;
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, chats });
    } catch (error) {
        console.log("Error in getting all chats", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

//api controller to delete chat
export const deleteChat = async (req, res) => {
    try {
        const {chatId} = req.body;
        const userId = req.id;
        await Chat.findOneAndDelete({ _id: chatId, userId });
        return res.status(200).json({ success: true, message: "Chat deleted successfully" })
    } catch (error) {
        console.log("Error in deleting chat", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}