import { Kafka } from "kafkajs";
import { prisma } from "./config";
const kafka_client = new Kafka({
    clientId : 'processor', // need to change the client id
    brokers : ['52.66.240.45:9092'],
    ssl: false,
  sasl: undefined,
  connectionTimeout: 1000,
  requestTimeout: 3000,
  retry: {
    maxRetryTime: 30000,
    retries: 5,
  },
  logLevel: 5,
})

async function process(){
    const producer = kafka_client.producer();
    await producer.connect();
    while(true){
        const rows = await prisma.zapRunOutbox.findMany({
            take : 10,
        })
        console.log(rows);
        producer.send({
            topic : "zap-events",
            messages : rows.map(r => {
                return {
                    value : JSON.stringify({zapRunId : r.zapRunId  , stage : 0})
                }
            })
        })
        await prisma.zapRunOutbox.deleteMany({
            where : {
                id : {
                    in : rows.map(r => r.id)
                }
            }
        })
    await new Promise(r => setTimeout(r , 3000))

    }
}
process();