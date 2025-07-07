import prisma from "./config/db.config.js";
import { producer, consumer } from "./config/kafka.config.js";

export const produceMessage = async (topic: string, message: any) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }]
  });
};

export const consumeMessages = async (topic: string) => {
  await consumer.connect();
  await consumer.subscribe({ topic: topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value ? message.value.toString() : null;
      const data = value ? JSON.parse(value) : null;
      console.log({
        partition,
        offset: message.offset,
        value: data
      });

      if (data) {
        await prisma.chats.create({
          data: data
        });
      }

      // Process the message (e.g., save to DB, trigger some action, etc.)
    }
  });
};
