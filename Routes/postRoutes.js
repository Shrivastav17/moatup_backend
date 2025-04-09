import express from "express";
import { addPost, likePost, commentPost, getPosts } from "../Controllers/postControllers.js";
import isAuthenticated from "../Middlewares/auth.middlewares.js";
import upload from "../Middlewares/upload.middlewares.js";

const createpostRouter = express.Router();

createpostRouter.post("/post", isAuthenticated,upload,addPost); // Create a post
createpostRouter.get("/getpost",getPosts);
createpostRouter.put("/like/:postId", isAuthenticated, likePost); // Like/Dislike a post
createpostRouter.post("/comment/:postId", isAuthenticated, commentPost); // Comment on a post

export default createpostRouter;
