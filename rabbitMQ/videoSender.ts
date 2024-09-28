
import { amqp, rabbitMQUrl, queue } from './rabbitMQConfig';

async function sendAVideoToQueue(data: any) {
    try {
        const connection = await amqp.connect(rabbitMQUrl, { setTimeout: 5000 });
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });

        channel.sendToQueue(queue, Buffer.from(data));
        // console.log("Pacotão de vídeo enviado para RabbitMQ");

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("Erro ao conectar ao RabbitMQ:", error);
    }
}

export default sendAVideoToQueue;
