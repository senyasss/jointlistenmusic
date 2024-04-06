const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Путь к директории, содержащей статические файлы
const publicPath = path.join(__dirname, 'public');



// Используем статические файлы из папки public
app.use(express.static(publicPath));

// Хранилище для текущего состояния воспроизведения
let isPlaying = false;

// Обработка подключения нового клиента
io.on('connection', (socket) => {
    console.log('Новый клиент подключен');

    // Отправка текущего состояния воспроизведения новому клиенту
    socket.emit('playbackState', isPlaying);

    // Обработка события воспроизведения/паузы от клиента
    socket.on('playPause', () => {
        isPlaying = !isPlaying;
        // Отправка события воспроизведения/паузы всем клиентам
        io.emit('playbackState', isPlaying);
    });
});

// Запуск сервера на порте 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порте ${PORT}`);
});