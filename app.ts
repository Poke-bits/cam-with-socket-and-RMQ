
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import util from 'util';
import sendAVideoToQueue from './rabbitMQ/videoSender';
import consumeAVideoQueue from './rabbitMQ/videoReceiver';

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log(`Novo cliente conectado: ${util.inspect(socket.id, { depth: null })}`);

    socket.on('video-data', (data) => {
        try {
            sendAVideoToQueue(data);
            console.log("Pacote de vídeo enviado para a fila.");
        } catch (error) {
            console.error("Erro ao enviar pacote de vídeo:", error);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});

consumeAVideoQueue(io);


server.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
