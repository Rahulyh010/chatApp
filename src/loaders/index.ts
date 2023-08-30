import { type Application } from "express";
import { type Server } from "socket.io";

import { dbConnect } from "@/database/mongodb";
import socketLoader from "@/socket/socket.loader";

import expressLoader from "./express-loader";

export default async (app: Application, io: Server) => {
  await dbConnect();
  expressLoader(app);
  socketLoader(io);
};
