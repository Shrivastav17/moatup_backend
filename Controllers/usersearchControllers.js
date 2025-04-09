import userModel from "../Models/userModal.js";
import postModel from "../Models/postModal.js";

const search = async (req, res) => {
    try {
        const { query } = req.query;

        // Validate input
        if (!query) {
            return res.status(400).json({ msg: "Search query is required" });
        }

        // Sanitize input to escape special characters for regex
        const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        // Search for profiles (username and fullname)
        const profiles = await userModel.find({
            $or: [
                { username: { $regex: sanitizedQuery, $options: "i" } },
                { fullname: { $regex: sanitizedQuery, $options: "i" } }
            ]
        })
        .select("username fullname avatar") // Include only necessary fields
        .limit(10); // Limit results to 10

        // Search for posts (content and hashtags)
        const posts = await postModel.find({
            $or: [
                { content: { $regex: sanitizedQuery, $options: "i" } },
                { hashtags: { $regex: sanitizedQuery, $options: "i" } }
            ]
        })
        .select("content hashtags userId timestamp") // Include only necessary fields
        .populate("userId", "username avatar") // Populate user info for each post
        .limit(10); // Limit results to 10

 // Check if no results are found
 if (profiles.length === 0) {
    return res.status(404).json({ 
        msg: "No users found" 
    });
}

// Return combined results
res.status(200).json({ profiles, posts });
} catch (error) {
console.error(error);
res.status(500).json({ msg: "Server error", error });
}
};

export default search;




