"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const radis = new ioredis_1.Redis({
    host: "localhost",
    port: 6379
});
exports.default = radis;
