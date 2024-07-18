import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()


async function main() {
    await producer.connect()
    producer.send({
        topic: 'payments',
        messages: [
            { value: 'world' }
        ]
    })
}

main()