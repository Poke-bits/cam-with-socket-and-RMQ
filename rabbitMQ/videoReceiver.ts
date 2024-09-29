import { amqp, rabbitMQUrl, queueName } from './rabbitMQConfig';

async function consumeVideoQueue(io: any) {
    try {
        const connection = await amqp.connect(rabbitMQUrl, { timeout: 5000 });
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: false });



        channel.consume(queueName, (msg) => {
            if (msg !== null) {
                const videoBuffer = msg.content;
                io.emit('view-video', videoBuffer);
                channel.ack(msg);

            }
        });
    } catch (error) {
        console.error("Erro ao conectar ao RabbitMQ:", error);
    }
}

export default consumeVideoQueue;
