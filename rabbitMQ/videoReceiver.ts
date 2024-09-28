import { amqp, rabbitMQUrl, queue } from './rabbitMQConfig';

async function consumeAVideoQueue(io: any) {
    try {
        const connection = await amqp.connect(rabbitMQUrl, { timeout: 5000 });
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });



        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const videoBuffer = msg.content; 
                io.emit('view-video', videoBuffer.toString('base64')); 
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("Erro ao conectar ao RabbitMQ:", error);
    }
}

export default consumeAVideoQueue;
