// import { Router } from "express";
// import ChatGroupController from "../controllers/chat.group.controller";
// import authMiddleware from "../middlewares/AuthMiddlewares";
// const router = Router();

// // router.post("/group-chat", authMiddleware, ChatGroupController.store);

// router.post("/group-chat", authMiddleware, async (req, res, next) => {
//   await ChatGroupController.store(req, res, next);
// });

// export default router;

// src/routes/chat.group.route.ts
import { Router } from "express";
import ChatGroupController from "../controllers/chat.group.controller";
import authMiddleware from "../middlewares/AuthMiddlewares";

const router = Router();

router.post("/group-chat", authMiddleware, async (req, res, next) => {
  await ChatGroupController.store(req, res, next);
});

export default router;
