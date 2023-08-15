import express, { json } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { mongodbConnect } from "./mongodb";
import cors from "cors";
import { config } from "dotenv";

config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

type Participant = string;
type Room = string;

// Initialize a data structure to store rooms
const rooms: { [key: string]: Room } = {};

app.use(json());

io.on("connection", (socket: Socket) => {
  console.log(rooms);
  console.log("User connected:", socket.id);

  socket.on("create room", ({ user, doctor }) => {
    console.log(doctor, user);
    let roomKey = doctor + "-" + user;

    if (!rooms[roomKey]) {
      rooms[roomKey] = user + "-" + doctor;
      console.log("room created");
    } else {
      console.log("room already exists");
    }
  });

  socket.on(
    "joinRoom",
    ({ user, doctor }: { user: Participant; doctor: Participant }) => {
      console.log(rooms, user, doctor);
      if (rooms[doctor + "-" + user]) {
        socket.join(user + "-" + doctor);
        console.log(socket.id, "Succesfully joined", user);
      } else {
        console.log("room dont exists please create one and try again");
      }
    }
  );

  socket.on(
    "sendMessage",
    ({
      user,
      doctor,
      message,
    }: {
      user: Participant;
      doctor: Participant;
      message: { sender: string; message: string };
    }) => {
      if (rooms[doctor + "-" + user]) {
        io.to(rooms[doctor + "-" + user]).emit("sendMessage", {
          user,
          doctor,
          message,
        });
        console.log(socket.id, "sent msg", message);
      }
    }
  );
  console.log(rooms);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    let key = socket.id;
    delete rooms.key;
    console.log("delete event executed");
  });
});

server.listen(process.env.PORT, async () => {
  await mongodbConnect();

  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
