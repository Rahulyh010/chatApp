import express from "express";
import http from "http";
import { Server } from "socket.io";

import env from "@/config/env";
import loaders from "@/loaders";
import { logger } from "@/utils/loggers";

const spinner = ["|", "/", "-", "\\"];
let i = 0;
const interval = setInterval(() => {
  process.stdout.write(`\r${spinner[i++ % spinner.length]} Initializing...`);
});

async function initialize() {
  const app = express();
  const server = http.createServer(app);
  const io: Server = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  await loaders(app, io);

  server.listen(env.PORT, () => {
    clearInterval(interval);
    logger.info(`Server is running on port ${env.PORT}`);
  });
}

initialize();
