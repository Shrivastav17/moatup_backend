import mongoose from "mongoose";
const { Schema } = mongoose;

const investorSchema = new Schema({

    sector: String,
    investor: String,
    state: String,
    city: String,


})

const investorModel = mongoose.model('investor', investorSchema);

export default investorModel;