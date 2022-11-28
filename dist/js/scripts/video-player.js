// TODO: Implementar esto como clase/dependencia AudioPlayer.
// Registrar componentes en App.DOMComponents

//Los nombres de las funciones tienen que ser exactamente estos!
//Y siempre tienen que devolver promesas

// const toggleClass = (element, className) => {
//     if(element.classList.contains(className)) {
//         element.classList.remove(className);
//     }
//     else {
//         element.classList.add(className);
//     }
// };

const afterInsert = () => {
    return new Promise( (resolve) => {
        
        const videoPlayer = document.querySelector('.video-player');
        // const playPauseOverlay = document.querySelector('.video-control[data-video-player-behavior="play-pause"]');

        videoPlayer.style.transition = '0.4s';

        videoPlayer.addEventListener('click', () => {
            if (videoPlayer.paused) {
                videoPlayer.style.opacity = 1;
                videoPlayer.play();
            }
            else {
                videoPlayer.pause();
                videoPlayer.style.opacity = 0.5;
            }
        });

        console.log(videoPlayer);
        window.gabvp = videoPlayer;
        videoPlayer.play();

        resolve();
    } );
}

export default { afterInsert };
