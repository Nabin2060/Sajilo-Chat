"use strict";
// import { Router } from "express";
// import ChatGroupController from "../controllers/chat.group.controller";
// import authMiddleware from "../middlewares/AuthMiddlewares";
// const router = Router();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // router.post("/group-chat", authMiddleware, ChatGroupController.store);
// router.post("/group-chat", authMiddleware, async (req, res, next) => {
//   await ChatGroupController.store(req, res, next);
// });
// export default router;
// src/routes/chat.group.route.ts
const express_1 = require("express");
const chat_group_controller_1 = __importDefault(require("../controllers/chat.group.controller"));
const AuthMiddlewares_1 = __importDefault(require("../middlewares/AuthMiddlewares"));
const router = (0, express_1.Router)();
router.post("/group-chat", AuthMiddlewares_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield chat_group_controller_1.default.store(req, res, next);
}));
router.get("/all-group", AuthMiddlewares_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield chat_group_controller_1.default.index(req, res, next);
}));
router.get("/all-group/:id", AuthMiddlewares_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield chat_group_controller_1.default.show(req, res, next);
}));
router.put("/all-group/:id", AuthMiddlewares_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield chat_group_controller_1.default.update(req, res, next);
}));
router.delete("/all-group/:id", AuthMiddlewares_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield chat_group_controller_1.default.delete(req, res, next);
}));
exports.default = router;
