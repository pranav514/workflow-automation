import { Kafka } from "kafkajs";
import { prisma } from "./config";
import { JsonObject } from "@prisma/client/runtime/library";
import { parse } from "./utils/parse";
import { sendMail } from "./utils/mail";

const kafka = new Kafka({
  clientId: "consumer-processing",
  brokers: ["52.66.240.45:9092"],
  ssl: false,
  sasl: undefined,
  connectionTimeout: 1000,
  requestTimeout: 3000,
  retry: {
    maxRetryTime: 30000,
    retries: 5,
  },
  logLevel: 5,
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
    fromBeginning: true, 
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
        await sendMail(to  , body);
        console.log("mail send succesfully");
      }
      await new Promise(r => setTimeout(r , 500));

      // if the zap contains more than one action sequentially add it to the queue again  , and increase the stage 
      // so that the state and sortordering will be matched 
      const laststage = (zapRunData?.zap.actions.length || 1 ) - 1
      if(laststage != stage){
        console.log("more actions , pushing back to queue");
        await producer.send({
            topic : "zap-events",
            messages  : [{
                value : JSON.stringify({
                    stage : stage + 1,
                    zapRunId
                })
            }]
        })
      }
       console.log("processed all the actions");
       //commit the offset that processed so that they will not be executed again
       await consumer.commitOffsets([{
        topic : "zap-events",
        partition : partition,
        offset : (parseInt(message.offset) + 1).toString()
       }])

    },

  });
}
main();
