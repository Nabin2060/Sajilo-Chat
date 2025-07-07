// import { Socket } from "dgram";
// import { Server } from "socket.io";

// interface CustomSocket extends Socket {
//   room?: string;
// }
// export function setupSocket(io: Server) {
//   io.use((socket, next) => {
//     const customSocket = socket as CustomSocket;
//     const room = customSocket.handshake.auth.room;

//     if (!room) {
//       return next(new Error("Invalid room"));
//     }

//     customSocket.room = room;
//     next();
//   });

//   io.on("connnection", (socket) => {
//     console.log("The socket connected...", socket.id);

//     socket.on("message", (data: any) => {
//       // console.log("hello");
//       console.log("Server side message", data);
//       // socket.emit("message", data);
//       socket.broadcast.emit("message", data);
//     });
//     socket.on("disconnect", () => {
//       console.log("A user disconnected", socket.id);
//     });
//   });
// }

import { Server, Socket } from "socket.io";
import { produceMessage } from "./helper.js";

interface CustomSocket extends Socket {
  room?: string;
}
export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    // * Join the room
    if (!socket.room) {
      console.log("No room found for socket", socket.id);
      return;
    }
    socket.join(socket.room);

    socket.on("message", async (data) => {
      try {
        await produceMessage("chats", data); // produceMessage is not defined, so commented out
      } catch (error) {
        console.log("The kafka produce error is", error);
      }
      if (socket.room) {
        socket.to(socket.room).emit("message", data);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}
