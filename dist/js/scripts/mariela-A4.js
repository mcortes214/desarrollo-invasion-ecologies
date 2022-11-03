import videoPlayer from './video-player.js';

const drawPoster = (ctx) => {
        //Setup
        ctx.font = '128px serenity';
        ctx.textAlign = 'center';
        ctx.baseline = 'middle';
        let backgroundColor = '#C4D4DC';
        let textColor = '#3E6B7E';
        
        //Dibujo
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, 1024, 576);
        ctx.fillStyle = textColor;
        ctx.fillText('¿Soy yo', 512, 150);
        ctx.fillText('una especie', 512, 300);
        ctx.fillText('invasora?', 512, 450);
}

const afterInsert = () => {
    return new Promise( (resolve) => {
        //Inicializar video y overlay
        videoPlayer.afterInsert();

        const canvas = document.querySelector('.revealing-canvas');
        canvas.style.objectFit = 'contain';
        const ctx = canvas.getContext('2d');

        //Init rendering
        // window.requestAnimationFrame(() => {
            ctx.fillStyle = "#000000";
            drawPoster(ctx);
        //     ctx.globalCompositeOperation = 'destination-in';
        //     ctx.fillRect(0, 0, 512, 300);
        // });

        resolve();
    } );
}

export default { afterInsert };
