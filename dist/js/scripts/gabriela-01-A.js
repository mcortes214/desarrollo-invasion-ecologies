import p5 from '/js/lib/p5.sound-module.js';

const multimediaPath = '/sketches/gabriela/poema/';


//--------------- 1: Definición del sketch

const s = ( sketch ) => {

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

    sketch.preload = () => {
      font = sketch.loadFont(multimediaPath + 'assets/Avenir.otf');
    }

    sketch.setup = () => {

    //Referencias para instance mode

      
        sketch.createCanvas(1000, 1000);
 
        sketch.cursor(sketch.CROSS);
        sketch.fill(255, 127);
        sketch.noStroke();
      
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
    };

    sketch.draw = () => {
        sketch.background(215);
  
        sketch.stroke(100,50);
        sketch.line(sketch.width / 2, 0, sketch.width / 2, sketch.height);
        sketch.line(0, sketch.height / 2, sketch.width, sketch.height / 2);
        sketch.noStroke();
        
        let centerDist = sketch.dist(sketch.mouseX, sketch.mouseY, sketch.width / 2, sketch.height / 2);
      
        let transparency = sketch.map(centerDist, 0, sketch.width / 2, 255, 50);
        transparency = sketch.constrain(transparency, 50, 255);
        sketch.fill(50,50,255, transparency);
        
        let jiggle = sketch.map(centerDist, 0, sketch.width, 1, 300);
      
        switch (numeroTexto){
          case 0:
            sketch.translate((sketch.width - sketch.abs(bounds0.w)) / 2, 
              (sketch.height + sketch.abs(bounds0.h)) / 2);
            for (let i = 0; i < points0.length; i++) {
              let p = points0[i];
              sketch.ellipse(p.x + jiggle * sketch.randomGaussian(), 
                p.y + jiggle * sketch.randomGaussian(), 3, 3);
            }
            break;
          case 1:
            sketch.translate((sketch.width - sketch.abs(bounds1.w)) / 2, 
              (sketch.height + sketch.abs(bounds1.h)) / 2);
            for (let i = 0; i < points1.length; i++) {
              let p = points1[i];
              sketch.ellipse(p.x + jiggle * sketch.randomGaussian(), 
                p.y + jiggle * sketch.randomGaussian(), 3, 3);
            }
            break;
          case 2:
            sketch.translate((sketch.width - sketch.abs(bounds2.w)) / 2, 
              (sketch.height + sketch.abs(bounds2.h)) / 2);
            for (let i = 0; i < points2.length; i++) {
              let p = points2[i];
              sketch.ellipse(p.x + jiggle * sketch.randomGaussian(), 
                p.y + jiggle * sketch.randomGaussian(), 3, 3);
            }
            break;
          case 3:
            sketch.translate((sketch.width - sketch.abs(bounds3.w)) / 2, 
              (sketch.height + sketch.abs(bounds3.h)) / 2);
            for (let i = 0; i < points3.length; i++) {
              let p = points3[i];
              sketch.ellipse(p.x + jiggle * sketch.randomGaussian(), 
                p.y + jiggle * sketch.randomGaussian(), 3, 3);
            }
            break;
          case 4:
            sketch.translate((sketch.width - sketch.abs(bounds4.w)) / 2, 
              (sketch.height + sketch.abs(bounds4.h)) / 2);
            for (let i = 0; i < points4.length; i++) {
              let p = points4[i];
              sketch.ellipse(p.x + jiggle * sketch.randomGaussian(), 
                p.y + jiggle * sketch.randomGaussian(), 3, 3);
            }
            break;
          case 5:
            sketch.translate((sketch.width - sketch.abs(bounds5.w)) / 2, 
              (sketch.height + sketch.abs(bounds5.h)) / 2);
            for (let i = 0; i < points5.length; i++) {
              let p = points5[i];
              sketch.ellipse(p.x + jiggle * sketch.randomGaussian(), 
                p.y + jiggle * sketch.randomGaussian(), 3, 3);
            }
            break;
          case 6:
            sketch.translate((sketch.width - sketch.abs(bounds6.w)) / 2, 
              (sketch.height + sketch.abs(bounds6.h)) / 2);
            for (let i = 0; i < points6.length; i++) {
              let p = points6[i];
              sketch.ellipse(p.x + jiggle * sketch.randomGaussian(), 
                p.y + jiggle * sketch.randomGaussian(), 3, 3);
            }
            break;
          case 7:
            sketch.translate((sketch.width - sketch.abs(bounds7.w)) / 2, 
              (sketch.height + sketch.abs(bounds7.h)) / 2);
            for (let i = 0; i < points7.length; i++) {
              let p = points7[i];
              sketch.ellipse(p.x + jiggle * sketch.randomGaussian(), 
                p.y + jiggle * sketch.randomGaussian(), 3, 3);
            }
            break;
          case 8:
            sketch.translate((sketch.width - sketch.abs(bounds8.w)) / 2, 
              (sketch.height + sketch.abs(bounds8.h)) / 2);
            for (let i = 0; i < points8.length; i++) {
              let p = points8[i];
              sketch.ellipse(p.x + jiggle * sketch.randomGaussian(), 
                p.y + jiggle * sketch.randomGaussian(), 3, 3);
            }
            break;
        }
    };

    sketch.mousePressed = () => {
        numeroTexto++;
        if (numeroTexto>=9)numeroTexto=0;
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
          p5Sketch.keyPressed = undefined;

          //Y después eliminarlo
          p5Sketch = undefined;
          
        resolve();
    } );
}

export default { afterInsert, beforeRemove };

