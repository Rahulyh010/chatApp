import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";

import router from "../api/routes";
import { logger } from "../utils/loggers";

export default async function (app: Application) {
  process.on("uncaughtException", (ex) => {
    logger.emerg("UNCAUGHT_EXPECTION", {
      stack: ex.stack,
      error: ex,
    });
  });

  process.on("unhandledRejection", (ex: any) => {
    logger.emerg("UNHANDLED_REJECTION", {
      stack: ex.stack,
      error: ex,
    });
  });

  app.enable("trust proxy");
  app.use(
    express.json({
      limit: "10mb",
    })
  );

  app.use(express.urlencoded({ extended: true }));

  app.use(helmet());
  // app.use(compression());
  app.use(cors());

  app.get("/", async (req, res) => {
    res
      .status(200)
      .json({
        resultMessage: "Project is sucessfully working🚀🚀🚀",
      })
      .end();
  });

  app.use("/api", router);
}
