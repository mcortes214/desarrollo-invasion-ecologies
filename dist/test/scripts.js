//DOM references
const canvas = document.querySelector('.test-canvas');
const ctx = canvas.getContext('2d');

//Intrinsic dimensions of canvas, used to render things inside
let canvasIntrinsicWidth = canvas.width;
let canvasIntrinsicHeight = canvas.height;

//Viewport calculations - recalculate these on resize
let { objectWidth, objectHeight, canvasOffsetX, canvasOffsetY, letterboxX, letterboxY } = calculateScreenValues();
window.addEventListener('resize', () => {
    ({ objectWidth, objectHeight, canvasOffsetX, canvasOffsetY, letterboxX, letterboxY } = calculateScreenValues());
})

// Helper functions
function map(value, minIn, maxIn, minOut, maxOut) {
    let rangeIn = maxIn - minIn;
    let rangeOut = maxOut - minOut;
    let multiplier = rangeOut / rangeIn;
    let output = value * multiplier + (minOut - minIn);
    return output;
}

function drawPoint(ctx, x, y) {
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
}

function calculateScreenValues() {
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


/* --- Draw in canvas --- */


//Init canvas
ctx.fillRect(0, 0, canvasIntrinsicWidth, canvasIntrinsicHeight);

//Mouse events
document.addEventListener('mousemove', (e) => {
    
    //Scale coordinates from actual object width to intrinsic width for canvas drawing
    let scaledX = map(e.clientX, 0, objectWidth, 0, canvasIntrinsicWidth);
    let scaledY = map(e.clientY, 0, objectHeight, 0, canvasIntrinsicHeight);

    //- Offsets -
    let XOffsetMappedToIntrinsic = map(canvasOffsetX, 0, objectWidth, 0, canvasIntrinsicWidth);
    let YOffsetMappedToIntrinsic = map(canvasOffsetY, 0, objectHeight, 0, canvasIntrinsicHeight);

    //- Letterboxes -
    
    let scaledLetterboxX = map(letterboxX, 0, objectWidth, 0, canvasIntrinsicWidth);
    let scaledLetterboxY = map(letterboxY, 0, objectHeight, 0, canvasIntrinsicHeight);

    let x = scaledX - XOffsetMappedToIntrinsic - scaledLetterboxX;
    let y = scaledY - YOffsetMappedToIntrinsic - scaledLetterboxY;

    window.requestAnimationFrame(()=> {
        drawPoint(ctx, x, y);
    })
})
