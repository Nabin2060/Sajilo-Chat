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
router.get("/all-group", authMiddleware, async (req, res, next) => {
  await ChatGroupController.index(req, res, next);
});
router.get("/all-group/:id", authMiddleware, async (req, res, next) => {
  await ChatGroupController.show(req, res, next);
});
router.put("/all-group/:id", authMiddleware, async (req, res, next) => {
  await ChatGroupController.update(req, res, next);
});
router.delete("/all-group/:id", authMiddleware, async (req, res, next) => {
  await ChatGroupController.delete(req, res, next);
});
export default router;
