import mongoose from "mongoose";
import { type } from "os";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    useremail: { type: String, required: true, unique: true },
    userpass: { type: String, required: true },

    description: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },

    specialties: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Investor", "Corporate"],
        required: true,
    },

    // Optional fields for Corporate
    companySize: {
        type: String,
       
    },
    industry: {
        type: String,
       
    },
    companyType: {
        type: String,
        
    },
    otp: { type: String },
    otpExpires: { type: Date },
    avatar: { type: String, default: '' },
    followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    following: [{ type: Schema.Types.ObjectId, ref: "users" }],
    timestamp: { type: Date, default: Date.now }
});

const userModel = mongoose.model('users', userSchema);

export default userModel;