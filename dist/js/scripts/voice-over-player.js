console.log('audio player cargado');

// TODO: Implementar esto como clase/dependencia AudioPlayer.
// Registrar componentes en App.DOMComponents

let audioPlayer = document.querySelector('.audio-player.voice-over');

let playButton = document.querySelector('.audio-control[data-audio-player=".voice-over"][data-audio-player-behavior="play"]');
let pauseButton = document.querySelector('.audio-control[data-audio-player=".voice-over"][data-audio-player-behavior="pause"]');
let stopButton = document.querySelector('.audio-control[data-audio-player=".voice-over"][data-audio-player-behavior="stop"]');

let seekBar = document.querySelector('.player-progress');
let seekBarEllapsed = document.querySelector('.player-progress__ellapsed');

let duration;


playButton.addEventListener('click', () => {
    audioPlayer.play();
});

pauseButton.addEventListener('click', () => {
    audioPlayer.pause();
});

stopButton.addEventListener('click', () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
});

audioPlayer.addEventListener('loadedmetadata', () => {
    duration = audioPlayer.duration;
})

seekBar.addEventListener('click', (e) => {
    const bar = seekBar.getBoundingClientRect();
    const clickXPosition = e.clientX - bar.x;
    //Round to three decimals
    const newTime = Math.round(clickXPosition / bar.width * duration * 1000 ) / 1000;
    audioPlayer.currentTime = newTime;
});



audioPlayer.addEventListener('timeupdate', () => {
    seekBarEllapsed.style.width = audioPlayer.currentTime / audioPlayer.duration * 100 + "%";
})