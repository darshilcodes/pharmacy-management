import mongoose from "mongoose";

const connectDB = async () => {
    try { 
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message); 
    }
};

export default connectDB;
