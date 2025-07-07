"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const chatGroupRoute_1 = __importDefault(require("./routes/chatGroupRoute"));
const socket_1 = require("./socket");
const redis_streams_adapter_1 = require("@socket.io/redis-streams-adapter");
const radis_config_1 = __importDefault(require("./config/radis.config"));
const kafka_config_1 = require("./config/kafka.config");
const helper_1 = require("./helper");
const { instrument } = require("@socket.io/admin-ui");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"],
        credentials: true
    },
    adapter: (0, redis_streams_adapter_1.createAdapter)(radis_config_1.default)
});
instrument(io, {
    auth: false,
    mode: "development"
});
(0, socket_1.setupSocket)(io);
exports.default = { io };
const PORT = process.env.PORT || 1000;
app.get("/", (req, res) => {
    res.status(200).json({ message: "hamro chat application..." });
});
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// routes
app.use("/api/v1/user", userRoute_1.default);
app.use("/api/v1/group", chatGroupRoute_1.default);
(0, kafka_config_1.connectedKafkaProducer)().catch((error) => {
    console.log(`something went wrong while connecting kafka...`);
});
(0, helper_1.consumeMessages)(process.env.KAFKA_TOPIC || "chats").catch((err) => console.log("The consumer error is", err));
server.listen(PORT, () => {
    console.log(`Application running on Port ${PORT}`);
});
