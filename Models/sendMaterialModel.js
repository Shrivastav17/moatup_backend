import mongoose from "mongoose";

const sendMaterialSchema = new mongoose.Schema({
  fileType: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  quarter: {
    type: String,
    required: true,
    enum: ['Q1', 'Q2', 'Q3', 'Q4'],
  },
  attachedDocuments: [{
    name: String,
    url: String, // If you’re storing file URLs
  }],

  emails: {
    type: [String], // Array of email addresses
    required: true,
  },

  dbAttachment: {
    name: String,
    url: String,
  },
  message: {
    type: String,
    required: true,
  },

}, {timestamps: true});

 const sendMaterialModel = mongoose.model("SendMaterial", sendMaterialSchema);

 export default sendMaterialModel;
