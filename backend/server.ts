import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

import userRouter from "./routes/userRoute";
import chatGroupRouter from "./routes/chatGroupRoute";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 1000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "hamro chat application..." });
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/group", chatGroupRouter);

app.listen(PORT, () => {
  console.log(`Application running on Port ${PORT}`);
});
