import mouseover from './mouseover.js';

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

// ----- Exported callbacks

const afterInsert = () => {
    return new Promise( (resolve) => {
        //Initialize video and overlays
        mouseover.afterInsert({drawPoster: drawPoster});

        resolve();
    } );
}

const beforeRemove = () => {
    return new Promise((resolve) => {
        mouseover.beforeRemove();

        resolve();
    });
}

export default { afterInsert, beforeRemove };




