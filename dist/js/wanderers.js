//Wanderers (a-frame)

class Wanderer{

    constructor(config){
        if(config === undefined) return console.error('No config object defined for Wanderer');
        let {element} = config;
        if(element === undefined) return console.error('No element defined for Wanderer');

        this.element = element;

        this.currentRotationValue = this.element.getAttribute('rotation');
        const crv = this.currentRotationValue;
        // this.currentRotation = [Math.floor(crv.x), Math.floor(crv.y), Math.floor(crv.z)];
        this.currentRotation = [Math.floor(crv.x), Math.floor(crv.y)];
        // this.deltaRotation = [this._intRand(6, 12), this._intRand(6, 12), this._intRand(6, 12)];
        
        this.deltaRotation = [this._intRand(-12, 12), this._intRand(-12, 12, 6)];
        
        //Force minimum horizontal rotation (second coordinate) so they don't stay in place
        // if ( this.deltaRotation[1] > 0 && this.deltaRotation[1] < 6 ){
        //     this.deltaRotation[1] = this._intRand(6, 12);
        // }
        // if ( this.deltaRotation[1] < 0 && this.deltaRotation[1] > -6 ){
        //     this.deltaRotation[1] = this._intRand(-12, -6);
        // }

        this.element.addEventListener('animationcomplete', () => {
            return this.animate();
        })
    }


    _intRand(m, n, minDistToZero){
        let num;
        if(!n){
            num = Math.floor(Math.random() * m);
        }
        else {
            num = Math.floor(Math.random() * (n-m) + m);
        }
        if (minDistToZero){
            if ( num > 0 && num < minDistToZero ){
                num = this._intRand(minDistToZero, n);
            }
            if ( num < 0 && num > -minDistToZero ){
                num = this._intRand(m, -minDistToZero);
            }
        }

        return num;
    }

    _forceMinDistanceToZero(property, n){
        
    }

    animate(){
        // Actualizar posición
        for (let i=0; i < this.currentRotation.length; i++){
            // console.log("Rotación previa:", this.currentRotation);
            this.currentRotation[i] += this.deltaRotation[i];
            // console.log("Rotación actual:", this.currentRotation);
        }

        //Limit elevation coordinate to prevent figures from crossing poles
        if (this.currentRotation[0] > 20){
            this.deltaRotation[0] -= 3;
        }
        if (this.currentRotation[0] < -20) {
            this.deltaRotation[0] += 3;
        }

        //Aplicar posición
        let newRotationString = `${this.currentRotation[0]} ${this.currentRotation[1]} 0`;
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