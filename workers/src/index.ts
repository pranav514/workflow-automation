import { Kafka } from "kafkajs";
import { prisma } from "./config";
import { JsonObject } from "@prisma/client/runtime/library";
import { parse } from "./utils/parse";
import { sendMail } from "./utils/mail";

const kafka = new Kafka({
  clientId: "consumer-processing",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({
    groupId: "main-worker",
  });
  await consumer.connect();
  const producer = kafka.producer();
  await producer.connect();
  consumer.subscribe({
    topic: "zap-events",
    fromBeginning: true, // this may create the issue bcoz if the new consumer is up it may process everything from beginning
  });
  await consumer.run({
    autoCommit: false, // it will not automatically marked as processed
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      if (!message.value?.toString()) {
        return;
      }
      const parsedData = JSON.parse(message.value.toString());
      const zapRunId = parsedData.zapRunId;
      const stage = parsedData.stage;
      const zapRunData = await prisma.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });
      const action = zapRunData?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );
      if (!action) {
        console.log("no current action found");
        return;
      }
      const zapRunMetadata = zapRunData?.metadata;
      if (action.type.id === "email") {
        const body = parse(
          (action.metadata as JsonObject)?.body as string,
          zapRunMetadata
        );
        const to = parse(
          (action.metadata as JsonObject)?.to as string,
          zapRunMetadata
        );
        console.log("mail send succesfully");
      }
    },
  });
}
main();
