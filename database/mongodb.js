import mongoose from 'mongoose';

async function dbconnection() {

return await mongoose.connect('mongodb+srv://admin:w359iGQLeqLw2HZ3@cluster0.ithwlin.mongodb.net/MoatUpdb');
}
export default dbconnection;