import { Request, Response, NextFunction } from "express";
// import "../custom-types.d.ts";
import prisma from "../config/db.config.js";
class ChatGroupController {
  static async index(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      if (!user?.id) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id
        },
        orderBy: {
          created_at: "desc"
        }
      });
      res.json({
        message: "Chat groups fetch successfully.",
        data: groups
      });
    } catch (error) {
      next(error);
    }
  }
  static async show(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const groups = await prisma.chatGroup.findUnique({
        where: {
          id: id
        }
      });
      res.json({
        message: "Chat group fetch successfully.",
        data: groups
      });
    } catch (error) {
      next(error);
    }
  }
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

  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body;
      const { id } = req.params;

      await prisma.chatGroup.update({
        data: {
          title: body.title,
          passcode: body.passcode
        },
        where: {
          id: id
        }
      });
      res.json({ message: "Chat group updated successfully." });
    } catch (error) {
      next(error);
    }
  }
  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      await prisma.chatGroup.delete({
        where: {
          id: id
        }
      });
      res.json({
        message: "Chat group deleted successfully."
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ChatGroupController;
