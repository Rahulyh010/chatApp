import { config } from "dotenv";
import mongoose from "mongoose";
config();
const url = process.env.DB_URI ?? "";

export async function mongodbConnect() {
  try {
    await mongoose.connect(url);
    console.log("We succesfully connected to the mongodb server 🚀🚀🚀");
  } catch (error) {
    console.log("not connected this could be possible error", error);
  }
}
