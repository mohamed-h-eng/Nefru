// import dotenv from 'dotenv'
// // dotenv.config({path: '../.env'})
// import mongoose from 'mongoose';
// import { env } from './env';
// export const connectedDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log(`Database connected: ${mongoose.connection.host}`);
//   } catch (error) {
//     console.log("MongoDB connection failed:", error);
//     process.exit(1);
//   }
// };

// export default connectedDB;
import mongoose from "mongoose";
import { env } from "./env.js";

export const connectedDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log(`Database connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
