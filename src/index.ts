import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({
    groupId: 'my-group' // consumer group id
})

async function main() {
    await Promise.all([
        consumer.connect(),
        producer.connect()
    ])
    producer.send({
        topic: 'quickstart-events',
        messages: [
            { key: 'hello', value: 'world' },
            { key: 'bye', value: 'world' }
        ]
    })

    consumer.subscribe({
        topic: 'quickstart-events',
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
                message: message.value.toString()
            })
        }
    })
}

main()

