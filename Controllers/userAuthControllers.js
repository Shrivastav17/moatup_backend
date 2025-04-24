import { encryptdata, comparedata } from '../Middlewares/encrypt.middlewares.js'
import jwt from 'jsonwebtoken';
import userModel from "../Models/userModal.js";
import isAuthenticated from '../Middlewares/auth.middlewares.js';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';



// const registerAction = async (req, res) => {
//     var {
//         username,
//         useremail,
//         userpass,     
//     } = req.body

//     var userpass = encryptdata(userpass)
//     console.log(userpass);


//     const dataToInsert = {
//         username: username,
//         useremail: useremail,
//         userpass: userpass,     
//     }
//     console.log(dataToInsert);

//     try {

//         // Check if useremail already exists
//         const existingUser = await userModel.findOne({ useremail: useremail });

//         console.log(existingUser);


//         if (existingUser) {
//             return res.status(409).send({ status: false, msg: "Email Id Exists" });
//         }

//         const userRegisterInstances = new userModel(dataToInsert)
//         var ansAfterInsert = await userRegisterInstances.save();
//         res.status(200).send({ status: true, message: "User Registered", data: ansAfterInsert })
//     }
//     catch (err) {
//         res.status(500).send({ status: false, message: "Error", err })
//         console.log(err);

//     }
// }
const registerAction = async (req, res) => {
  try {
    let { username, useremail, userpass,description, website,specialties,type,companySize,industry,companyType } = req.body;

    // Encrypt password inside try block
    userpass = encryptdata(userpass);
    console.log("🔐 Hashed Password:", userpass);

    // Check if email already exists
    const existingUser = await userModel.findOne({ useremail });
    if (existingUser) {
      return res.status(409).json({ status: false, msg: "Email Id Exists" });
    }

    // Create new user instance
    const userRegisterInstance = new userModel({
      username,
      useremail,
      userpass,
      description, website,specialties,type,companySize,industry,companyType
    });

    // Save user to database
    const savedUser = await userRegisterInstance.save();

    res.status(201).json({ status: true, message: "User Registered", data: savedUser });

  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ status: false, message: "Server error", error: err });
  }
};

const loginAction = async (req, res) => {
  const { useremail, userpass } = req.body;

  try {
    // Find user
    const user = await userModel.findOne({ useremail });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("User found: ", user);

    // Compare passwords
    const isMatch = comparedata(user.userpass, userpass);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const tokenData = { id: user._id };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

    // Set cookie and send token in response
    return res.status(200)
      .cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" }) // Secure cookie
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        token ,
        user: {
          type: user.type, // This is what we need in frontend
        },
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

const logOutAction = (req, res) => {
  res.cookie("token", "", { expires: new Date(Date.now()) }).json({
    message: "User Logged Out Successfully"
  });

}

const forgotPassword = async (req, res) => {
  const { useremail } = req.body;
  // console.log(`Generated OTP for ${users.useremail}: ${otp}`);

  try {
    // Check if the user exists in the database
    const user = await userModel.findOne({ useremail });
    if (!user) {
      return res.status(404).json({ message: 'Email not registered.' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp; // Save the OTP to the database
    user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    await user.save();

    // Send the OTP viauseremail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Replace with youruseremail
        pass: process.env.EMAIL_PASS, // Replace with youruseremail password
      },
    });

    const mailOptions = {
      from: 'process.env.EMAIL_USER',
      to: useremail,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

const verifyOTP = async (req, res) => {
  const { otp } = req.body;

  try {
    // Find the user with the provided OTP
    const user = await userModel.findOne({ otp });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Check if the OTP has expired
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    // OTP is valid, just send the success message without clearing it
    res.status(200).json({ message: 'OTP verified successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to verify OTP.' });
  }
};


const resetPassword = async (req, res) => {
  const { otp, userpass } = req.body;
  console.log("Reset password request body:", req.body);

  if (!userpass || typeof userpass !== 'string') {
    return res.status(400).json({ message: 'Password is required and must be a string.' });
  }

  try {
    // Find user by OTP and ensure OTP has not expired
    const user = await userModel.findOne({ otp, otpExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'User not found or OTP expired.' });
    }

    console.log("User found:", user);

    // Hash the password
    user.userpass = encryptdata(userpass);

    user.otp = null; // Clear OTP after reset
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to reset password.' });
  }
};

// ✅ Fetch all users (excluding passwords)
 const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-userpass"); // Exclude password for security
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// ✅ Fetch a single user by ID (excluding password)
const getUserById = async (req, res) => {
  try {
    const { userid} = req.params;
    console.log(userid);
    
    // Valuserate Objectuser
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await userModel.findById(userid).select("-userpass");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error:error.message });
    console.log(error);
    
  }
};

export {
  registerAction,
  loginAction,
  logOutAction,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getAllUsers,
  getUserById
};