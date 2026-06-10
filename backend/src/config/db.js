// import mongoose from 'mongoose';
// import { env } from './env.js';

// export async function connectDatabase() {
//   await mongoose.connect(env.mongoUri);
//   console.log(`Database connected: ${mongoose.connection.host}`);
// }
const mongoose = require("mongoose");
const connectedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

module.exports = connectedDB;
