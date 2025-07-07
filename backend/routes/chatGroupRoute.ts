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
import ChatGroupUserController from "../controllers/chat.group.user.controller";
import ChatsController from "../controllers/chats.controller";

const router = Router();

router.post("/group-chat", authMiddleware, async (req, res, next) => {
  await ChatGroupController.store(req, res, next);
});
router.get("/all-group", authMiddleware, async (req, res, next) => {
  await ChatGroupController.index(req, res, next);
});
router.get("/all-group/:id", async (req, res, next) => {
  await ChatGroupController.show(req, res, next);
});
router.put("/all-group/:id", authMiddleware, async (req, res, next) => {
  await ChatGroupController.update(req, res, next);
});
router.delete("/all-group/:id", authMiddleware, async (req, res, next) => {
  await ChatGroupController.delete(req, res, next);
});

//
router.get("/chat-group-users", async (req, res) => {
  await ChatGroupUserController.index(req, res);
});

router.post("/chat-group-users", async (req, res) => {
  await ChatGroupUserController.store(req, res);
});

router.get("/group-chat/:id", async (req, res, next) => {
  await ChatGroupController.show(req, res, next);
});

// chats
router.get("/chats/:groupId", async (req, res) => {
  await ChatsController.index(req, res);
});

export default router;
