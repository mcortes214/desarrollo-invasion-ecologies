/*Gabriela Munguía
"Sonidos océanicos"
A traves del canto de las ballenas, esta interfaz nos invita a hacer conciencia de la contaminación sonora en los océanos y sus efectos en la pérdida de biodiversidad  marinas y sus hábitos de supervivencia. 
 
Apretando y manteniendo las teclas:
Tecla 1 - sonido de ballena 1
Tecla 2 - sonido de ballena 2
Tecla 3 - sonido de una hélice de un barco
Tecla 4 - sonido de un sonar de un submarino
Tecla 5 - sonido de exploracion sísmica de hidrocarburos
puedes generar una composición sonora con sonidos subacuático.  
*/
let playMode = 'sustain';

let bg;
let y = 0;
let song1;//sonido de fondo
let song2;// sonido ballena1
let song3; // sonido ballena2
let song4; // helice barco
let song5; // sonido sonar submarino
let song6; // exploración sísmica petrolera

let playing = false; //Maxi

function preload() {
  soundFormats('mp3');
  song1 = loadSound('multimedia/subacuatico.mp3');
  song2 = loadSound('multimedia/ballena-agudo.mp3');
  song3 = loadSound('multimedia/ballena-grave.mp3');
  song4 = loadSound('multimedia/helice.mp3');
  song5 = loadSound('multimedia/sonar.mp3');
  song6 = loadSound('multimedia/exploracion.mp3');

}

function setup() {
  // La imagen de fondo debe tener el mismo tamaño que el lienzo, según el método createCanvas().
  playMode = 'sustain';
  bg =loadImage('multimedia/fondodelmar_cuadrado.jpg');
  createCanvas(1000, 1000);
}

function draw() {
  background(bg);
}
/*
function mousePressed() {
  if (song2.isPlaying()) {
    // .isPlaying() retorna una variable booleana
    song2.stop();
  } else {
    song2.play();
  }
}
*/

function keyPressed() {
  if (!playing) {
    playing = true;
    song1.loop();  
  }
  //Tecla 1
  if (keyCode ===49){
    togglePlayMode()
    song2.play();
    }else if (keyCode ===50){
    togglePlayMode()
    song3.play();
    }  else  if (keyCode ===51){
    togglePlayMode()
    song4.play();
    }  else if (keyCode ===52){
    togglePlayMode()
    song5.play();
    }  else if (keyCode ===53){
    togglePlayMode()
    song6.play();
    }  
}

function togglePlayMode() {
  if (playMode == 'sustain') {
  song2.playMode(playMode);
  song3.playMode(playMode);
  song4.playMode(playMode);
  song5.playMode(playMode);
  song6.playMode(playMode);
}
  }