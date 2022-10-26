// TODO: Implementar esto como clase/dependencia AudioPlayer.
// Registrar componentes en App.DOMComponents

(function(){
    console.log('audio player cargado');

    const audioPlayer = document.querySelector('.audio-player.voice-over');
    const playButton = document.querySelector('.audio-control[data-audio-player=".voice-over"][data-audio-player-behavior="play"]');
    const pauseButton = document.querySelector('.audio-control[data-audio-player=".voice-over"][data-audio-player-behavior="pause"]');
    const stopButton = document.querySelector('.audio-control[data-audio-player=".voice-over"][data-audio-player-behavior="stop"]');
    const seekBar = document.querySelector('.player-progress');
    const seekBarEllapsed = document.querySelector('.player-progress__ellapsed');

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
        //Round time in seconds to three decimals
        const newTime = Math.round(clickXPosition / bar.width * duration * 1000 ) / 1000;
        audioPlayer.currentTime = newTime;
    });


    //Couple seek bar width to current time

    audioPlayer.addEventListener('timeupdate', () => {
        seekBarEllapsed.style.width = audioPlayer.currentTime / audioPlayer.duration * 100 + "%";
    })
})();
