import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        console.log("Token received:", token); // Debugging

        if (!token) {
            return res.status(401).json({ message: "User not authenticated. Token is missing." });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("Decoded Token:", decoded); // Check token structure

        req.userId = decoded.id; // FIXED: Assign 'id' instead of 'userId'

        if (!req.userId) {
            return res.status(401).json({ message: "Invalid token: User ID missing." });
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Authentication failed", error });
    }
};

export default isAuthenticated;
