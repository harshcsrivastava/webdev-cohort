import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    // What is inside this
    console.log(`MongoDB conneced: ${conn.connect.hosy}`);
    
}

export default connectDB