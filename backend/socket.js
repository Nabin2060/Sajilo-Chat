"use strict";
// import { Socket } from "dgram";
// import { Server } from "socket.io";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = setupSocket;
const helper_js_1 = require("./helper.js");
function setupSocket(io) {
    io.use((socket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new Error("Invalid room"));
        }
        socket.room = room;
        next();
    });
    io.on("connection", (socket) => {
        // * Join the room
        if (!socket.room) {
            console.log("No room found for socket", socket.id);
            return;
        }
        socket.join(socket.room);
        socket.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, helper_js_1.produceMessage)("chats", data); // produceMessage is not defined, so commented out
            }
            catch (error) {
                console.log("The kafka produce error is", error);
            }
            if (socket.room) {
                socket.to(socket.room).emit("message", data);
            }
        }));
        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
    });
}
