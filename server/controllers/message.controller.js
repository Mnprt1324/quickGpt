import User from "../models/user.model.js";
import axios from "axios";
import Chat from "../models/chat.model.js"
import genAI from "../utils/gemini.js";
import imagekit from "../utils/imagekit.js";

export const textMessageGen = async (req, res) => {
    try {
        const userId = req.id;
        const { chatId, prompt } = req.body;
        const user = await User.findById(userId);
        if (user.credites <= 1) {
            return res.status(403).json({ success: false, message: "Insufficient credits" })
        }
        const chat = await Chat.findOne({ _id: chatId, userId });
        chat.message.push({ role: "user", content: prompt, timestamps: Date.now(), isImage: false });
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt)
        const aiReply = result.response.text();

        const reply = { content: aiReply, role: "assistant", timestamps: Date.now(), isImage: false }
        res.json({ success: true, reply });
        chat.message.push(reply);
        await chat.save();
        await User.findByIdAndUpdate(userId, { $inc: { credites: -1 } })
    } catch (error) {
        console.log("Error in saving message", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }

}

// img genration controller
export const ImageMessageGen = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (user.credites <= 1) {
            return res.status(403).json({ success: false, message: "Insufficient credits" })
        }
        const { prompt, chatId, isPublished } = req.body;
        const chat = await Chat.findOne({ _id: chatId, userId });
       chat.message.push({ role: "user", content: prompt, timestamps: Date.now(), isImage: true });
        // const encodedPrompt = encodeURIComponent(prompt);
        // const generateImageUrl = `${process.env.IMG_KIT_urlEndpoint}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`
        // const aiImageResponse = await axios.get(generateImageUrl, {
        //     responseType: "arraybuffer",
        // })
        const formData = new FormData();
        formData.append("prompt", prompt);
        console.log(process.env.CLIP_DROP_API)
        const aiImageResponse = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIP_DROP_API
            },
            responseType: "arraybuffer"
        })

        // convert to base64
        const base64Img = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString('base64')}`
        const uploadResponse = await imagekit.upload({
            file: base64Img,
            fileName: `${Date.now()}.png`,
            folder: "quickgpt"
        })
        const reply = {
            role: "assistant", content: uploadResponse.url, timestamps: Date.now(), isImage: true, isPublished
        }
        res.json({ success: true, reply })
        chat.message.push(reply);
        await chat.save();
        await User.findByIdAndUpdate(userId, { $inc: { credites: -1 } })

    } catch (error) {
        console.log("Error in generating image", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }

}

