// TODO: Implementar esto como clase/dependencia AudioPlayer.
// Registrar componentes en App.DOMComponents

//Los nombres de las funciones tienen que ser exactamente estos!
//Y siempre tienen que devolver promesas

const afterInsert = () => {
    return new Promise( (resolve) => {
        
        console.log('audio player cargado');

        const audioPlayer = document.querySelector('.audio-player.voice-over');
        const playButton = document.querySelector('.audio-control[data-audio-player=".voice-over"][data-audio-player-behavior="play"]');
        const pauseButton = document.querySelector('.audio-control[data-audio-player=".voice-over"][data-audio-player-behavior="pause"]');
        const stopButton = document.querySelector('.audio-control[data-audio-player=".voice-over"][data-audio-player-behavior="stop"]');
        const seekBar = document.querySelector('.player-progress');
        const seekBarEllapsed = document.querySelector('.player-progress__ellapsed');

        if( ! audioPlayer ){
            // if there isn't any player, resolve immediately
            resolve();
        }

        if(playButton) {
            playButton.addEventListener('click', () => {
                audioPlayer.play();
            });
        }

        if(pauseButton) {
            pauseButton.addEventListener('click', () => {
                audioPlayer.pause();
            });
        }

        if(stopButton) {
            stopButton.addEventListener('click', () => {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            });
        }

        if(seekBar){
            seekBar.addEventListener('click', (e) => {
                const bar = seekBar.getBoundingClientRect();
                console.log('bar:', bar);
                const clickXPosition = e.clientX - bar.x;
                console.log('e:', e);
                console.log('e.clientX:', e.clientX);
                console.log('clickXPosition:', clickXPosition);
                //Round time in seconds to three decimals
                const newTime = Math.round(clickXPosition / bar.width * audioPlayer.duration * 1000 ) / 1000;
                console.log(newTime);
                audioPlayer.currentTime = newTime;
            });
        }

        if(seekBarEllapsed){
            //Couple seek bar width to current time
            audioPlayer.addEventListener('timeupdate', () => {
                seekBarEllapsed.style.width = audioPlayer.currentTime / audioPlayer.duration * 100 + "%";
            })
        }

        resolve();
    } );
}

export default { afterInsert };



