import p5 from '/js/lib/p5.sound-module.js';

const multimediaDirPath = '/sketches/ana/rompecabezas/50/';


//--------------- 1: Definición del sketch

const hitboxRadio = 100;

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
            piece.x = sketch.random(sketch.width*0.25 + hitboxRadio, sketch.width*0.75 - hitboxRadio);
            piece.y = sketch.random(sketch.height*0.25 + hitboxRadio, sketch.height*0.75 - hitboxRadio);
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
            collidedPiece.x = sketch.constrain(sketch.mouseX, 0, sketch.width);
            collidedPiece.y = sketch.constrain(sketch.mouseY, 0, sketch.height);
            updateImages(sketch);
        }
    }
};

let p5Sketch;

//--------------- 2: Callback

const afterInsert = () => {
    return new Promise( (resolve) => {
        p5Sketch = new p5(s, document.querySelector('.p5-container'));
        resolve();
    } );
}

const beforeRemove = () => {
    return new Promise( (resolve) => {
          //Forzar a p5 a eliminar los eventos que haya creado
          p5Sketch.preload = undefined;
          p5Sketch.setup = undefined;
          p5Sketch.draw = undefined;
          p5Sketch.mouseDragged = undefined;

          //Y después eliminarlo
          p5Sketch = undefined;
          
        resolve();
    } );
}

export default { afterInsert, beforeRemove };

