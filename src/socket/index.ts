import { type Namespace, type Socket } from "socket.io";

import { verifyToken } from "@/api/middleware/auth.middleware";

import event from "./event";

export async function chatServer(io: Namespace) {
  const { DISCONNECT, JOIN_ROOM, SEND_MESSAGE } = event;

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      console.log("error");
      next(new Error("Authentication Error"));
      return "";
    }

    const user = verifyToken(token);
    if (!user) {
      console.log("error");
      next(new Error("Authentication Error"));
      return "";
    }
    socket.user = user;
    next();
  }).on("connection", (socket: Socket) => {
    console.log("user connected", socket.id);

    socket.on(JOIN_ROOM, () => {
      console.log("JOINING ROOM");
    });

    socket.on(SEND_MESSAGE, () => {
      console.log("JOINING ROOM");
    });

    socket.on(DISCONNECT, () => {
      console.log("User disconnected", socket.id);
    });
  });
}
