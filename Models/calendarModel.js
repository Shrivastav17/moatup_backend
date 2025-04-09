import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({

    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    color: { type: String, default: '#007bff' }, 

   
})

const eventModel = mongoose.model('Event', eventSchema);

export default eventModel;