import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({
    groupId: 'my-group' // consumer group id
})


async function main() {
    await consumer.connect()
    consumer.subscribe({
        topic: 'payments',
        fromBeginning: true
    })
    consumer.run({
        eachMessage: async ({
            topic,
            partition,
            message
        }) => {
            console.log({
                topic,
                partition,
                offset: message.offset,
                message: message.value.toString()
            })
        }
    })
}
main()