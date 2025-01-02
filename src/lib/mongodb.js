import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
      console.log("db connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
