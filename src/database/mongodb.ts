import mongoose from "mongoose";

import env from "@/config/env";
import { logger } from "@/utils/loggers";

export async function dbConnect() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.DB_URI, {
      minPoolSize: 3,
      maxPoolSize: 10,
    });
    console.clear();
    logger.info("🐱 DataBase Connected");
  } catch (error: any) {
    logger.emerg("Database_conn_error", {
      error,
      stack: error.stack,
    });
    logger.info(error.message);
    process.exit(1);
  }
}
