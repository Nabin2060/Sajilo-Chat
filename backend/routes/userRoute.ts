import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

//login
router.post("/login", async (req, res, next) => {
  try {
    await UserController.login(req, res);
  } catch (err) {
    next(err);
  }
});
export default router;
