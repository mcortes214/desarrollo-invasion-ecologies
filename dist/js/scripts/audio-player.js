// TODO: Implementar esto como clase/dependencia AudioPlayer.
// Registrar componentes en App.DOMComponents

//Los nombres de las funciones tienen que ser exactamente estos!
//Y siempre tienen que devolver promesas

class AudioPlayer {
    constructor(options){
        const {audio, playerRoot, playButton, pauseButton, stopButton, seekBar, seekBarEllapsed} = options;
        Object.assign(this, {audio, playerRoot, playButton, pauseButton, stopButton, seekBar, seekBarEllapsed});
        console.log(this);
    }
}

function activateButton(behavior, player) {
    const activeButton = player.playerRoot.querySelector(`.audio-control.active`);
    if (activeButton) { activeButton.classList.remove('active'); }
    const newButton = player.playerRoot.querySelector(`.audio-control[data-audio-player-behavior="${behavior}"]`);
    newButton.classList.add('active');
}

const createPlayersFromDOM = () => {
    const playerObject = {};
    const playersInDOM = document.querySelectorAll('.audio-player');
    console.log('playersInDOM:', playersInDOM);
    for (let player of playersInDOM) {
        
        const playerName = player.dataset.playerName;
        console.log('playerName:', playerName);

        const playerRoot = document.querySelector(`.audio-player[data-player-name="${playerName}"]`);
        console.log('playerRoot:', playerRoot);

        playerObject[playerName] = new AudioPlayer({
            playerRoot: playerRoot,
            audio: playerRoot.querySelector(`audio`),
            playButton: playerRoot.querySelector(`.audio-control[data-audio-player-behavior="play"]`),
            pauseButton: playerRoot.querySelector(`.audio-control[data-audio-player-behavior="pause"]`),
            stopButton: playerRoot.querySelector(`.audio-control[data-audio-player-behavior="stop"]`),
            seekBar: playerRoot.querySelector(`.player-progress`),
            seekBarEllapsed: playerRoot.querySelector(`.player-progress .player-progress_ellapsed`),
        });
    }
    return playerObject;
}

const afterInsert = () => {
    return new Promise( (resolve) => {
        
        console.log('audio player cargado');
        const players = createPlayersFromDOM();
        console.log(players);

        for (let name in players) {
            const {playButton, pauseButton, stopButton, seekBar, audio} = players[name];
            let audioPlayer = audio;
            let seekBarEllapsed = seekBar.querySelector('.player-progress__ellapsed');

            playButton.addEventListener('click', () => {
                audioPlayer.play();
                activateButton('play', players[name]);
            });
    
            pauseButton.addEventListener('click', () => {
                audioPlayer.pause();
                activateButton('pause', players[name]);
            });
    
            stopButton.addEventListener('click', () => {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                activateButton('stop', players[name]);
            });
    
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
    
            //Couple seek bar width to current time
            audioPlayer.addEventListener('timeupdate', () => {
                seekBarEllapsed.style.width = audioPlayer.currentTime / audioPlayer.duration * 100 + "%";
            });

            audioPlayer.addEventListener('ended', () => {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                activateButton('stop', players[name]);
            });
        }

        resolve();
    } );
}

export default { afterInsert };



