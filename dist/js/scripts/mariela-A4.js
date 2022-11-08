import videoPlayer from './video-player.js';

let posterCanvas, pctx, screenCanvas, sctx, maskCanvas, mctx;
//Mask canvas data:
let objectWidth, objectHeight, canvasOffsetX, canvasOffsetY, letterboxX, letterboxY, canvasIntrinsicWidth, canvasIntrinsicHeight;

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

const drawScene = (ctx) => {
    ctx.drawImage(posterCanvas, 0, 0);
    ctx.drawImage(maskCanvas, 0, 0);
    window.requestAnimationFrame(() => {drawScene(ctx)});
}

function map(value, rangeIn, rangeOut) {
    // let rangeIn = maxIn - minIn;
    // let rangeOut = maxOut - minOut;
    let multiplier = rangeOut / rangeIn;
    // let output = value * multiplier + (minOut - minIn);
    let output = value * multiplier;
    return output;
}

function drawPoint(ctx, x, y) {
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();
}



function calculateScreenValues(canvas) {
    let canvasRect = canvas.getBoundingClientRect();
    let canvasWidth = canvasRect.width;
    let canvasHeight = canvasRect.height;
    //Offset values calculated in screen pixels
    let canvasOffsetX = canvasRect.x;
    let canvasOffsetY = canvasRect.y;
    //Aspect ratio correction between canvas element and the actual visible object
    let canvasAspectRatio = canvasWidth / canvasHeight;
    let objectAspectRatio = canvasIntrinsicWidth / canvasIntrinsicHeight;
    let aspectRatioCorrectionX = Math.min(1, objectAspectRatio / canvasAspectRatio);
    let aspectRatioCorrectionY = Math.min(1, canvasAspectRatio / objectAspectRatio);
    //Get object size
    let objectWidth = canvasWidth * aspectRatioCorrectionX;
    let objectHeight = canvasHeight * aspectRatioCorrectionY;
    //Letterbox size in actual screen pixels (of a single band)
    let letterboxX = (canvasWidth - objectWidth) / 2;
    let letterboxY = (canvasHeight - objectHeight) / 2;
    return { objectWidth, objectHeight, canvasOffsetX, canvasOffsetY, letterboxX, letterboxY };
}

function drawOnMaskCanvas(e) {
    //Scale coordinates from actual object width to intrinsic width for canvas drawing
    let scaledX = map(e.clientX, objectWidth, canvasIntrinsicWidth);
    let scaledY = map(e.clientY, objectHeight, canvasIntrinsicHeight);
    //- Offsets -
    let scaledXOffset = map(canvasOffsetX, objectWidth, canvasIntrinsicWidth);
    let scaledYOffset = map(canvasOffsetY, objectHeight, canvasIntrinsicHeight);
    //- Letterboxes -
    let scaledLetterboxX = map(letterboxX, objectWidth, canvasIntrinsicWidth);
    let scaledLetterboxY = map(letterboxY, objectHeight, canvasIntrinsicHeight);

    //- End values for X and Y
    let x = scaledX - scaledXOffset - scaledLetterboxX;
    let y = scaledY - scaledYOffset - scaledLetterboxY;

    console.log('drawing');

    window.requestAnimationFrame(() => {
        drawPoint(mctx, x, y);
    });
}


// ----- Exported callbacks

const afterInsert = () => {
    return new Promise( (resolve) => {
        //Initialize video and overlays
        videoPlayer.afterInsert();


        // ----- 1- Update global variables values after loading

        //Poster
        posterCanvas = document.querySelector('.poster-canvas');
        pctx = posterCanvas.getContext('2d');
        //Screen
        screenCanvas = document.querySelector('.revealing-canvas');
        sctx = screenCanvas.getContext('2d');
        //Mask
        maskCanvas = document.querySelector('.revealing-canvas-mask');
        mctx = maskCanvas.getContext('2d');

        screenCanvas.style.objectFit = 'contain';
        maskCanvas.style.objectFit = 'contain';

        //Intrinsic dimensions of canvas, used to render things inside
        canvasIntrinsicWidth = maskCanvas.width;
        canvasIntrinsicHeight = maskCanvas.height;

        //Viewport calculations - recalculate these on resize
        ({ objectWidth, objectHeight, canvasOffsetX, canvasOffsetY, letterboxX, letterboxY } = calculateScreenValues(maskCanvas));
        window.addEventListener('resize', () => {
            ({ objectWidth, objectHeight, canvasOffsetX, canvasOffsetY, letterboxX, letterboxY } = calculateScreenValues(maskCanvas));
        })

        // ----- 2- Setup drawing events

        //2.1 - Draw poster
        window.requestAnimationFrame(() => {
            drawPoster(pctx);
        });

        //2.2 - Set up mouse and touch events for mask canvas
        document.addEventListener('mousemove', drawOnMaskCanvas);
        document.addEventListener('touchmove', drawOnMaskCanvas);

        //2.3 - Begin scene animation loop
        window.requestAnimationFrame(() => {
            sctx.globalCompositeOperation = 'destination-atop';
            drawScene(sctx);
        });

        resolve();
    } );
}

const beforeRemove = () => {
    return new Promise((resolve) => {
        document.removeEventListener('mousemove', drawOnMaskCanvas);
        document.removeEventListener('touchmove', drawOnMaskCanvas);
        resolve();
    });
}

export default { afterInsert, beforeRemove };




