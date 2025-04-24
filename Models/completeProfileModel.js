import mongoose from "mongoose";
import { type } from "os";
const { Schema } = mongoose;

const completeProfileSchema = new Schema({
    companyname: String,
    foundyear: Number,
    companytype: String,
    PAN: {
        type:String,
        required:true
    },
    Adhaarno:
    {type: String,
    required: true},
    contactno: Number,
    mobileno: Number,
    emailid: String

})

const completeProfileModel = mongoose.model('completeProfile', completeProfileSchema);

export default completeProfileModel;

