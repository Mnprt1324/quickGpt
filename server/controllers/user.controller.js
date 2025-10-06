import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/genrateToken.js";
import Chat from "../models/chat.model.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        const user = new User({ name, email, password });
        await user.save();
        const token = generateToken(user._id);
        res.status(201).json({ success: true, token, message: "User registered successfully" })
    } catch (error) {
        console.log("Error in registering user", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// user Login controllers
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
        const token = generateToken(user._id);
        res.cookie("token", token, { maxAge: 900000, httpOnly: true, secure: true })
        res.status(200).json({ success: true, token, message: "User logged in successfully" })
    } catch (error) {
        console.log("Error in logging in user", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const userLogout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ success: false, message: "User not logged in" })
        }
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "User Logged out successfully" })
    } catch (error) {
        console.log("Error in logging out user", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in getting user details", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// get publish image
export const getPublishedImages = async (req, res) => {
    try {
        const publishImageMessages = await Chat.aggregate([
            { $unwind: "$message" },
            {
                $match: {
                    "message.isImage": true,
                    "message.isPublished": true
                }
            },
            {
                $project: {
                    _id: 0,
                    imgurl: "$message.content",
                    userName: "$useName"
                }
            }
        ])
        res.status(200).json({ success: true, images: publishImageMessages.reverse() })

    } catch (error) {
        console.log("Error in getting all images:", error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}