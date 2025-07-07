import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import userRouter from "./routes/userRoute";
import chatGroupRouter from "./routes/chatGroupRoute";
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import radis from "./config/radis.config";
import { connectedKafkaProducer } from "./config/kafka.config";
import { error } from "console";
import { consumeMessages } from "./helper";
const { instrument } = require("@socket.io/admin-ui");

dotenv.config();
const app: Application = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true
  },
  adapter: createAdapter(radis)
});

instrument(io, {
  auth: false,
  mode: "development"
});

setupSocket(io);
export default { io };

const PORT = process.env.PORT || 1000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "hamro chat application..." });
});

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/group", chatGroupRouter);

connectedKafkaProducer().catch((error) => {
  console.log(`something went wrong while connecting kafka...`);
});
consumeMessages(process.env.KAFKA_TOPIC || "chats").catch((err) =>
  console.log("The consumer error is", err)
);

server.listen(PORT, () => {
  console.log(`Application running on Port ${PORT}`);
});
