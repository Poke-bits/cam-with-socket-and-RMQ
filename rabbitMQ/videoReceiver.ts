
import { amqp, rabbitMQUrl, queue } from './rabbitMQConfig';

async function consumeAVideoQueue(io: any) {
    try {
        const connection = await amqp.connect(rabbitMQUrl, { setTimeout: 5000 });
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });

        console.log("Aguardando pacotes de vídeo na fila...");

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log("Pacote de vídeo recebido da fila");
                io.emit('view-video', msg.content);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("Erro ao conectar ao RabbitMQ:", error);
    }
}

export default consumeAVideoQueue;
