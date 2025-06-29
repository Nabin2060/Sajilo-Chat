import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 1000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "hamro chat application..." });
});

app.listen(PORT, () => {
  console.log(`Application running on Port ${PORT}`);
});
