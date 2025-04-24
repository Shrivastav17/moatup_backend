import path from 'path';
import postModel from "../Models/postModal.js";

export const addPost = async (req, res) => {
    try {
        console.log("Files received:", req.files);
        console.log("Body Data:", req.body);
        console.log("User ID:", req.userId); // Ensure userId is logged

        if (!req.userId) {
            return res.status(401).json({ message: "User authentication required." });
        }

        const { content, message } = req.body;
        const media = req.files?.map(file => path.basename(file.path)) || [];

        // Create new post
        const newPost = new postModel({ userId: req.userId, content, message, media });
        const savedPost = await newPost.save();

        res.status(201).json({ message: "Post created successfully", post: savedPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post", error });
    }
};



// show post

// export const getPosts = async (req, res) => {
//     try {
//         const posts = await postModel.find().sort({ createdAt: -1 }); // Fetch latest posts first

//         res.status(200).json({ success: true, posts });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching posts", error });
//     }
// };
export const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find()
            .populate("userId", "username") // Populate post creator's username
            .populate({
                path: "comments.userId",
                select: "username"  // Populate comments' usernames
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts", error });
    }
};





// Like or Unlike a Post
export const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId; // Ensure req.userId is set from authentication middleware

    try {
        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            // Unlike the post
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
            await post.save();
            return res.status(200).json({ message: "Post unliked", likes: post.likes.length });
        } else {
            // Like the post
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({ message: "Post liked", likes: post.likes.length });
        }
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Error processing like action", error });
    }
};



// Comment on a Post
export const commentPost = async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    console.log("Received comment:", { postId, userId, text });

    try {
        if (!text) return res.status(400).json({ message: "Comment cannot be empty" });

        let post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Add comment
        post.comments.push({ userId, text, createdAt: new Date() });
        await post.save();

        // Fetch updated post with populated user details
        post = await postModel.findById(postId)
            .populate({
                path: "comments.userId",
                select: "username"
            });

        console.log("Updated Post with Comments:", JSON.stringify(post, null, 2));
        console.log("Comments in post:", post.comments);

        res.status(201).json({ message: "Comment added successfully", comments: post.comments });
    }
    catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Error processing comment", error });
    }
};


