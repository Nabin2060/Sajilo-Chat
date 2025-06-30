import { Request, Response, NextFunction } from "express";
import "../custom-types.d.ts";
import prisma from "../config/db.config.js";
class ChatGroupController {
  static async store(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body;
      const user = req.user;
      if (!user?.id) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id
        }
      });
      res.json({ message: "Chat group created successfully." });
    } catch (error) {
      next(error);
    }
  }
}

export default ChatGroupController;
