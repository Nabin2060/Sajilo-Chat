"use strict";
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
// import "../custom-types.d.ts";
const db_config_js_1 = __importDefault(require("../config/db.config.js"));
class ChatGroupController {
    static index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!(user === null || user === void 0 ? void 0 : user.id)) {
                    res.status(400).json({ message: "User ID is required" });
                    return;
                }
                const groups = yield db_config_js_1.default.chatGroup.findMany({
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
            }
            catch (error) {
                next(error);
            }
        });
    }
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const groups = yield db_config_js_1.default.chatGroup.findUnique({
                    where: {
                        id: id
                    }
                });
                res.json({
                    message: "Chat group fetch successfully.",
                    data: groups
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const user = req.user;
                if (!(user === null || user === void 0 ? void 0 : user.id)) {
                    res.status(400).json({ message: "User ID is required" });
                    return;
                }
                yield db_config_js_1.default.chatGroup.create({
                    data: {
                        title: body.title,
                        passcode: body.passcode,
                        user_id: user.id
                    }
                });
                res.json({ message: "Chat group created successfully." });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const { id } = req.params;
                yield db_config_js_1.default.chatGroup.update({
                    data: {
                        title: body.title,
                        passcode: body.passcode
                    },
                    where: {
                        id: id
                    }
                });
                res.json({ message: "Chat group updated successfully." });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield db_config_js_1.default.chatGroup.delete({
                    where: {
                        id: id
                    }
                });
                res.json({
                    message: "Chat group deleted successfully."
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ChatGroupController;
