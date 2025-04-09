import express, { Router } from "express";
import { loginAction, logOutAction, registerAction,forgotPassword,verifyOTP,resetPassword,getAllUsers,getUserById } from "../Controllers/userAuthControllers.js";
import isAuthenticated from "../Middlewares/auth.middlewares.js";

const userRoute = express.Router();

userRoute.post('/registeruser',registerAction);
userRoute.post('/login', loginAction);
userRoute.get('/logoutuser',logOutAction);
userRoute.post('/forgot-password', forgotPassword);
userRoute.post('/verify-otp', verifyOTP);
userRoute.post('/reset-password', resetPassword);
userRoute.get('/allusers', isAuthenticated, getAllUsers);
userRoute.get('/user/:userid', getUserById);
export default userRoute;

