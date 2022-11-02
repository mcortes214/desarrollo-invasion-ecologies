//importar módulo p5

import p5 from './p5.sound-module.js';

const s = ( sketch ) => {

    let playMode = 'sustain';

    let bg;
    let song1;//sonido de fondo
    let song2;// sonido ballena1
    let song3; // sonido ballena2
    let song4; // helice barco
    let song5; // sonido sonar submarino
    let song6; // exploración sísmica petrolera

    sketch.preload = () => {
        sketch.soundFormats('mp3');
        song1 = sketch.loadSound('multimedia/subacuatico.mp3');
        song2 = sketch.loadSound('multimedia/ballena-agudo.mp3');
        song3 = sketch.loadSound('multimedia/ballena-grave.mp3');
        song4 = sketch.loadSound('multimedia/helice.mp3');
        song5 = sketch.loadSound('multimedia/sonar.mp3');
        song6 = sketch.loadSound('multimedia/exploracion.mp3');
    }

    sketch.setup = () => {
        playMode = 'sustain';
        bg = sketch.loadImage('multimedia/fondo-cuadrado.jpg');
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

let myp5 = new p5(s);