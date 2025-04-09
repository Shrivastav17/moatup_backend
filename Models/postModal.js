import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    content: { type: String, required: true },
    message: { type: String }, // Added message field
    media: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // Array of user IDs who liked the post
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const postModel = mongoose.model('posts', postSchema);

export default postModel;
