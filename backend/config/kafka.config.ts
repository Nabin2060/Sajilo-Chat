import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_USERNAME || "user",
    password: process.env.KAFKA_PASSWORD || "pass"
  },
  logLevel: logLevel.ERROR
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "charts" });

export const connectedKafkaProducer = async () => {
  await producer.connect();
  console.log("kafka producer connected...");
};
