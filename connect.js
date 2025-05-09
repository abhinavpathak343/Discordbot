import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://10abhinavpathak:abhi@cluster0.7xtoz.mongodb.net/urlshortner');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}