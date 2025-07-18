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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectedKafkaProducer = exports.consumer = exports.producer = exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
exports.kafka = new kafkajs_1.Kafka({
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
    ssl: true,
    sasl: {
        mechanism: "plain",
        username: process.env.KAFKA_USERNAME || "user",
        password: process.env.KAFKA_PASSWORD || "pass"
    },
    logLevel: kafkajs_1.logLevel.ERROR
});
exports.producer = exports.kafka.producer();
exports.consumer = exports.kafka.consumer({ groupId: "charts" });
const connectedKafkaProducer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.producer.connect();
    console.log("kafka producer connected...");
});
exports.connectedKafkaProducer = connectedKafkaProducer;
