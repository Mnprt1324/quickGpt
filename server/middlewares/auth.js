import jwt from "jsonwebtoken";

const chectAuth = (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized User" })
        }
        const id = jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) throw new Error("Unauthorized User")
            return decode.id;
        });
        req.id = id;
        next();
    } catch (error) {
        console.log("Error in auth middleware", error);
        res.status(401).json({ success: false, message: "Unauthorized User" })
    }

}

export default chectAuth;