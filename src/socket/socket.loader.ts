import { type Server } from "socket.io";

import { logger } from "@/utils/loggers";

import { chatServer } from ".";

export default function (io: Server) {
  chatServer(io.of("/chat"));
  logger.info("Socket Server Started");
}
