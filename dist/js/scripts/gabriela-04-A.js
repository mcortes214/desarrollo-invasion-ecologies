import p5 from '/js/lib/p5.sound-module.js';


const multimediaPath = '/sketches/gabriela/ballenas/';
const modalName = "modal-gabriela-01-A";

let bg;
let song1;//sonido de fondo
let song2;// sonido ballena1
let song3; // sonido ballena2
let song4; // helice barco
let song5; // sonido sonar submarino
let song6; // exploración sísmica petrolera

let actions = {};
let actionButtons = {};

const setupAudioActionButtons = () => {
    for (let key in actions) {
        actionButtons[key] = document.querySelector(`button[data-action=${key}]`);
        if (actionButtons[key]) {
            actionButtons[key].addEventListener('click', actions[key]);
        }
    }
}
const unsetAudioActionButtons = () => {
    for (let key in actionButtons) {
        if (actionButtons[key]) {
            actionButtons[key].removeEventListener('click', actions[key]);
        }
    }
}

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
        //Setup functions to access sounds externally
        actions.playBallena1 = () => { song2.play() };
        actions.playBallena2 = () => { song3.play() };
        actions.playHelice = () => { song4.play() };
        actions.playSonar = () => { song5.play() };
        actions.playExploracion = () => { song6.play() };
        //And bind these functions to action buttons (audio actions only, for now)
        setupAudioActionButtons();
    };

    sketch.draw = () => {
        sketch.background(bg);
    };

    sketch.keyPressed = (keyEvent) => {

        let keyCode = keyEvent.keyCode;

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

        unsetAudioActionButtons();

        resolve();
    } );
}

export default { afterInsert, beforeRemove };



