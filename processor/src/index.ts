import { Kafka } from "kafkajs";
import { prisma } from "./config";
const kafka_client = new Kafka({
    clientId : 'localhost:9092', // need to change the client id
    brokers : ["localhost:9092"],
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
            topic : "zap-event",
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