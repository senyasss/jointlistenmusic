document.addEventListener("DOMContentLoaded", function() {
    const socket = io();

    const playPauseBtn = document.getElementById("play-pause-btn");
    const audioPlayer = document.getElementById("audio-player");

    playPauseBtn.addEventListener("click", function() {
        // Отправка события воспроизведения/паузы на сервер
        socket.emit('playPause');
    });

    // Обработка обновления состояния воспроизведения от сервера
    socket.on('playbackState', function(isPlaying) {
        // Обновление интерфейса в соответствии с новым состоянием воспроизведения
        if (isPlaying) {
            audioPlayer.play(); // Начать воспроизведение аудио
            playPauseBtn.textContent = "Pause";
        } else {
            audioPlayer.pause(); // Поставить аудио на паузу
            playPauseBtn.textContent = "Play";
        }
    });
});