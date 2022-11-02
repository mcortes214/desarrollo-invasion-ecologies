import p5 from '/js/lib/p5.sound-module.js';


const multimediaPath = '/sketches/gabriela/ballenas/';

let bg;
let song1;//sonido de fondo
let song2;// sonido ballena1
let song3; // sonido ballena2
let song4; // helice barco
let song5; // sonido sonar submarino
let song6; // exploración sísmica petrolera


//--------------- 1: Definición del sketch

const s = ( sketch ) => {

    let playMode = 'sustain';

    sketch.preload = () => {
        sketch.soundFormats('mp3');
        song1 = sketch.loadSound(multimediaPath + 'subacuatico.mp3');
        song2 = sketch.loadSound(multimediaPath + 'ballena-agudo.mp3');
        song3 = sketch.loadSound(multimediaPath + 'ballena-grave.mp3');
        song4 = sketch.loadSound(multimediaPath + 'helice.mp3');
        song5 = sketch.loadSound(multimediaPath + 'sonar.mp3');
        song6 = sketch.loadSound(multimediaPath + 'exploracion.mp3');
    }

    sketch.setup = () => {
        playMode = 'sustain';
        bg = sketch.loadImage(multimediaPath + 'fondo-cuadrado.jpg');
        sketch.createCanvas(1000, 1000);
        song1.loop();
    };

    sketch.draw = () => {
        sketch.background(bg);
    };

    sketch.keyPressed = (keyEvent) => {

        let keyCode = keyEvent.keyCode;
        console.log(keyCode);

        //Tecla 1
        if (keyCode === 49) {
            sketch.togglePlayMode();
            song2.play();
        } else if (keyCode === 50) {
            sketch.togglePlayMode();
            song3.play();
        } else if (keyCode === 51) {
            sketch.togglePlayMode();
            song4.play();
        } else if (keyCode === 52) {
            sketch.togglePlayMode();
            song5.play();
        } else if (keyCode === 53) {
            sketch.togglePlayMode();
            song6.play();
        }  
    }

    sketch.togglePlayMode = () => {
        if (playMode == 'sustain') {
            song2.playMode(playMode);
            song3.playMode(playMode);
            song4.playMode(playMode);
            song5.playMode(playMode);
            song6.playMode(playMode);
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

        song1.stop();
        song2.stop();
        song3.stop();
        song4.stop();
        song5.stop();
        song6.stop();

        //Forzar a p5 a eliminar los eventos que haya creado
        p5Sketch.preload = undefined;
        p5Sketch.setup = undefined;
        p5Sketch.draw = undefined;
        p5Sketch.keyPressed = undefined;

        //Y después eliminarlo
        p5Sketch = undefined;

        bg = undefined;
        song1 = undefined;
        song2 = undefined;
        song3 = undefined;
        song4 = undefined;
        song5 = undefined;
        song6 = undefined;

        resolve();
    } );
}

export default { afterInsert, beforeRemove };



