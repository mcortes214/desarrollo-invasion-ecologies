//Wanderers (a-frame)

class Wanderer{

    constructor(config){
        if(config === undefined) return console.error('No config object defined for Wanderer');
        let {element} = config;
        if(element === undefined) return console.error('No element defined for Wanderer');

        this.element = element;

        this.currentRotationValue = this.element.getAttribute('rotation');
        const crv = this.currentRotationValue;
        this.currentRotation = [Math.floor(crv.x), Math.floor(crv.y), Math.floor(crv.z)];
        this.deltaRotation = [10, 10, 10];

        this.element.addEventListener('animationcomplete', () => {
            return this.animate();
        })
    }

    animate(){
        // Actualizar posición
        for (let i=0; i < this.currentRotation.length; i++){
            // console.log("Rotación previa:", this.currentRotation);
            this.currentRotation[i] += this.deltaRotation[i];
            // console.log("Rotación actual:", this.currentRotation);
        }

        //Aplicar posición
        let newRotationString = `${this.currentRotation[0]} ${this.currentRotation[1]} ${this.currentRotation[2]}`;
        this.element.setAttribute(
            'animation', `property: rotation;
            to: ${newRotationString};
            dur: 3500;
            easing: linear`
          );
    }
}

class Wanderers {
    constructor(query){
        this.wandererElements = document.querySelectorAll(query);
        this.setup().then((wandererObjects) => {
            for (let w of wandererObjects){
                w.animate();
            }
        });
    }

    setup(){
        return new Promise((resolve, reject) => {
            this.wanderers = [];
            for ( let element of this.wandererElements ){
                element.addEventListener('loaded', () => {
                    this.wanderers.push(new Wanderer({element: element}));
                    if(this.wanderers.length === this.wandererElements.length){
                        resolve(this.wanderers);
                    }
                })
            }
        });
    }
}