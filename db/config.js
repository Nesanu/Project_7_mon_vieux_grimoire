import mongoose from "mongoose";

/**
 * ## connectDB
 * 
 * @description Connect to the database
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};