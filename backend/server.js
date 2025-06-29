"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1000;
app.get("/", (req, res) => {
    res.status(200).json({ message: "hamro chat application..." });
});
app.listen(PORT, () => {
    console.log(`Application running on Port ${PORT}`);
});
