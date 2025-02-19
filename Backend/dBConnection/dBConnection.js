import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = mongoose
  // database connection
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Database connection failed");
  });
