import { Server } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connnection", (socket) => {
    console.log("The socket connected...", socket.id);

    socket.on("message", (data: any) => {
      console.log("Server side message", data);
      // socket.emit("message", data);
      socket.broadcast.emit("message", data);
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
}
