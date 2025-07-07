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
exports.consumeMessages = exports.produceMessage = void 0;
const db_config_js_1 = __importDefault(require("./config/db.config.js"));
const kafka_config_js_1 = require("./config/kafka.config.js");
const produceMessage = (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
    yield kafka_config_js_1.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }]
    });
});
exports.produceMessage = produceMessage;
const consumeMessages = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    yield kafka_config_js_1.consumer.connect();
    yield kafka_config_js_1.consumer.subscribe({ topic: topic });
    yield kafka_config_js_1.consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
            const value = message.value ? message.value.toString() : null;
            const data = value ? JSON.parse(value) : null;
            console.log({
                partition,
                offset: message.offset,
                value: data
            });
            if (data) {
                yield db_config_js_1.default.chats.create({
                    data: data
                });
            }
            // Process the message (e.g., save to DB, trigger some action, etc.)
        })
    });
});
exports.consumeMessages = consumeMessages;
