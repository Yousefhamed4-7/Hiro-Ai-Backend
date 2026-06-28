import mongoose from "mongoose";
import { config } from "./config/index.js";

async function connect(): Promise<void> {
  if (!config.mongoUri) {
    console.error("Error: MONGO_URI environment variable is missing");
    process.exit(1);
  }

  try {
    await mongoose.connect(config.mongoUri);
  } catch (err) {
    console.log("Error Connecting to mongodb");
    console.error(err);
    process.exit(1);
  }
}

async function seed(): Promise<void> {
  // Seeding logic here
}
