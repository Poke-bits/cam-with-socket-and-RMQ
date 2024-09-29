
import { amqp, rabbitMQUrl, queueName } from './rabbitMQConfig';

async function sendVideoToQueue(data: any) {
    try {
        const connection = await amqp.connect(rabbitMQUrl, { setTimeout: 5000 });
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: false });

        channel.sendToQueue(queueName, Buffer.from(data));
        // console.log("Pacotão de vídeo enviado para RabbitMQ");

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("Erro ao conectar ao RabbitMQ:", error);
    }
}

export default sendVideoToQueue;
