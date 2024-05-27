import mongoose from 'mongoose';

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.NEXT_MONGODB_URI || 'mongodb://localhost:27017/gateway');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

export default dbConnect;
