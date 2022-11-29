import p5 from '/js/lib/p5.sound-module.js';

const multimediaDirPath = '/sketches/ana/rompecabezas/';


//--------------- 1: Definición del sketch

const hitboxRadio = 75;

const piecesPaths = [
    'cot4.png',
    'coto1.png',
    'coto2.png',
    'coto3.png',
    'cuerpo.png',
    'pico.png',
    'tibu1.png',
];
let pieces;

const mouseIsCollidingPiece = (sketch) => {
        for (let piece of pieces){
            if (sketch.dist(sketch.mouseX, sketch.mouseY, piece.x, piece.y) < hitboxRadio) {
                sketch.cursor(sketch.MOVE);
                return piece;
            }
        }
        sketch.cursor(sketch.ARROW);
        return false;
    }


const updateImages = (sketch) => {
    sketch.clear();
    for (let piece of pieces){
        sketch.image(piece.img, piece.x, piece.y);
    }
}

// window.drawFunc = 


const s = ( sketch ) => {

    sketch.preload = () => {
        pieces = piecesPaths.map((filePath, idx) => {
            return {
                id: idx,
                img: sketch.loadImage(multimediaDirPath + filePath),
            }
        });
    }

    sketch.setup = () => {
        sketch.createCanvas(1000, 1000);
        //Inicializar posiciones aleatorias
        sketch.imageMode(sketch.CENTER);
        for (let piece of pieces) {
            piece.x = sketch.random(0 + hitboxRadio, sketch.width - hitboxRadio);
            piece.y = sketch.random(0 + hitboxRadio, sketch.width - hitboxRadio);
        }
        updateImages(sketch);
        //Ubicar piezas en sus posiciones originales(for... placePiece(x, y))
    };

    sketch.draw = () => {
        let collidedPiece = mouseIsCollidingPiece(sketch);
        console.log(collidedPiece);

        // let collidedPiece = mouseIsCollidingPiece(sketch);
        // if (collidedPiece) {
        //     sketch.cursor(sketch.MOVE);
        // }
        // else {
        //     sketch.cursor(sketch.ARROW);
        // }
    };

    sketch.mouseDragged = () => {
        let collidedPiece = mouseIsCollidingPiece(sketch);
        if (collidedPiece) {
            collidedPiece.x = sketch.mouseX;
            collidedPiece.y = sketch.mouseY;
            updateImages(sketch);
        }
        //Chequear si mouseX y mouseY están dentro del radio de alguna imagen
        // if mouseIsCollidingPiece() > dentro tiene un loop que verifica cada pieza. Retorna el id de la pieza

        // Y si es así, 
    }
};

let p5Sketch;
p5Sketch = new p5(s, document.querySelector('.p5-container'));
