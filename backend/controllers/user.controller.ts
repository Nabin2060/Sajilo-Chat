import { Request, Response } from "express";
import prisma from "../config/db.config";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oauth: string;
  image?: string;
}

class UserController {
  static async login(request: Request, response: Response) {
    try {
      const body: LoginPayloadType = request.body;
      let user = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      });
      if (!user) {
        user = await prisma.user.create({
          data: body
        });
      }
      const JWTPayload = {
        name: body.name,
        email: body.email,
        id: user.id
      };

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
        expiresIn: "2h"
      });

      return response.status(200).json({
        message: "Logged in successfully",
        user: {
          ...user,
          token: `Bearer ${token}`
        }
      });
    } catch (error) {
      return response.status(500).json({
        message: "Something went wrong.please try again!"
      });
    }
  }
}

export default UserController;
