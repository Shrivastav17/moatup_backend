import mongoose from "mongoose";
const { Schema } = mongoose;

const inviteInvestorSchema = new Schema({

  eventName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  eventPlace: {
    type: String,
    required: true,
  },
  inviteFile: {
    type: String, // Store the file path or URL
  },
  emails: {
    type: [String], // Array of email addresses
    required: true,
  },
  databaseFile: {
    type: String, // Store the file path or URL
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });


const inviteInvestorModel = mongoose.model('inviteInvestor', inviteInvestorSchema);

export default inviteInvestorModel;