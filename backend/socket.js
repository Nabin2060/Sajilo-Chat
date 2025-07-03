"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = setupSocket;
function setupSocket(io) {
    io.on("connnection", (socket) => {
        console.log("The socket connected...", socket.id);
        socket.on("message", (data) => {
            console.log("Server side message", data);
            // socket.emit("message", data);
            socket.broadcast.emit("message", data);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });
    });
}
