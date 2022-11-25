/*
“Primero estaba el mar. 
Todo estaba oscuro.
No había sol, 
ni luna, ni gente, 
ni animales, 
ni plantas. 
Solo el mar estaba en todas partes. 
El mar era madre.”
*/
let font;
let points0;//"Primero estaba el mar. 
let bounds0; 
let points1;//Todo estaba oscuro.
let bounds1;
let points2;//No había sol, 
let bounds2;
let points3;//ni luna, ni gente,
let bounds3;
let points4;//ni animales,
let bounds4;
let points5;//ni plantas. 
let bounds5;
let points6;//Solo el mar estaba
let bounds6;
let points7;//en todas partes.
let bounds7;
let points8;//El mar era madre.”
let bounds8;

let numeroTexto=0;


function preload() {
  font = loadFont('./assets/Avenir.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
 
  cursor(CROSS);
  fill(255, 127);
  noStroke();

  points0 = font.textToPoints(
    'Primero estaba el mar.', 0, 0, 55, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  bounds0 = font.textBounds(
    'Primero estaba el mar.', 0, 0, 55);
  points1 = font.textToPoints(
    'Todo estaba oscuro.', 0, 0, 55, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  bounds1 = font.textBounds(
    'Todo estaba oscuro.', 0, 0, 55);
  points2 = font.textToPoints(
    'No había sol,', 0, 0, 55, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  bounds2 = font.textBounds(
    'No había sol,', 0, 0, 55);
  points3 = font.textToPoints(
    'ni luna, ni gente,', 0, 0, 55, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  bounds3 = font.textBounds(
    'ni luna, ni gente,', 0, 0, 55);
  points4 = font.textToPoints(
    'ni animales,', 0, 0, 55, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  bounds4 = font.textBounds(
    'ni animales,', 0, 0, 55);
  points5 = font.textToPoints(
    'ni plantas.', 0, 0, 55, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  bounds5 = font.textBounds(
    'ni plantas.', 0, 0, 55);
  points6 = font.textToPoints(
    'Solo el mar estaba', 0, 0, 55, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  bounds6 = font.textBounds(
    'Solo el mar estaba', 0, 0, 55);
  points7 = font.textToPoints(
    'en todas partes.', 0, 0, 55, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  bounds7 = font.textBounds(
    'en todas partes.', 0, 0, 55);
  points8 = font.textToPoints(
    'El mar era madre.”', 0, 0, 55, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  bounds8 = font.textBounds(
    'El mar era madre.”', 0, 0, 55);
}

function mousePressed() {
  numeroTexto++;
  if (numeroTexto>=9)numeroTexto=0;
}

function draw() {
  background(255);
  
  stroke(100,50);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
  noStroke();
  
  let centerDist = dist(mouseX, mouseY, width / 2, height / 2);

  let transparency = map(centerDist, 0, width / 2, 255, 50);
  transparency = constrain(transparency, 50, 255);
	fill(50,50,255, transparency);
  
  let jiggle = map(centerDist, 0, width, 1, 300);

  switch (numeroTexto){
    case 0:
      translate((width - abs(bounds0.w)) / 2, 
        (height + abs(bounds0.h)) / 2);
      for (let i = 0; i < points0.length; i++) {
        let p = points0[i];
        ellipse(p.x + jiggle * randomGaussian(), 
          p.y + jiggle * randomGaussian(), 3, 3);
      }
      break;
    case 1:
      translate((width - abs(bounds1.w)) / 2, 
        (height + abs(bounds1.h)) / 2);
      for (let i = 0; i < points1.length; i++) {
        let p = points1[i];
        ellipse(p.x + jiggle * randomGaussian(), 
          p.y + jiggle * randomGaussian(), 3, 3);
      }
      break;
    case 2:
      translate((width - abs(bounds2.w)) / 2, 
        (height + abs(bounds2.h)) / 2);
      for (let i = 0; i < points2.length; i++) {
        let p = points2[i];
        ellipse(p.x + jiggle * randomGaussian(), 
          p.y + jiggle * randomGaussian(), 3, 3);
      }
      break;
    case 3:
      translate((width - abs(bounds3.w)) / 2, 
        (height + abs(bounds3.h)) / 2);
      for (let i = 0; i < points3.length; i++) {
        let p = points3[i];
        ellipse(p.x + jiggle * randomGaussian(), 
          p.y + jiggle * randomGaussian(), 3, 3);
      }
      break;
    case 4:
      translate((width - abs(bounds4.w)) / 2, 
        (height + abs(bounds4.h)) / 2);
      for (let i = 0; i < points4.length; i++) {
        let p = points4[i];
        ellipse(p.x + jiggle * randomGaussian(), 
          p.y + jiggle * randomGaussian(), 3, 3);
      }
      break;
    case 5:
      translate((width - abs(bounds5.w)) / 2, 
        (height + abs(bounds5.h)) / 2);
      for (let i = 0; i < points5.length; i++) {
        let p = points5[i];
        ellipse(p.x + jiggle * randomGaussian(), 
          p.y + jiggle * randomGaussian(), 3, 3);
      }
      break;
    case 6:
      translate((width - abs(bounds6.w)) / 2, 
        (height + abs(bounds6.h)) / 2);
      for (let i = 0; i < points6.length; i++) {
        let p = points6[i];
        ellipse(p.x + jiggle * randomGaussian(), 
          p.y + jiggle * randomGaussian(), 3, 3);
      }
      break;
    case 7:
      translate((width - abs(bounds7.w)) / 2, 
        (height + abs(bounds7.h)) / 2);
      for (let i = 0; i < points7.length; i++) {
        let p = points7[i];
        ellipse(p.x + jiggle * randomGaussian(), 
          p.y + jiggle * randomGaussian(), 3, 3);
      }
      break;
    case 8:
      translate((width - abs(bounds8.w)) / 2, 
        (height + abs(bounds8.h)) / 2);
      for (let i = 0; i < points8.length; i++) {
        let p = points8[i];
        ellipse(p.x + jiggle * randomGaussian(), 
          p.y + jiggle * randomGaussian(), 3, 3);
      }
      break;
  }
}