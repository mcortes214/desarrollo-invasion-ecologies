//Wanderers (a-frame)

class Wanderer{

    constructor(config){

        if(config === undefined) return console.error('No config object defined for Wanderer');
        let {element,
            direction,
            minVerticalSpeed,
            maxVerticalSpeed,
            minHorizontalSpeed,
            maxHorizontalSpeed} = config;
        if(element === undefined) return console.error('No element defined for Wanderer');
        if(direction === undefined) return console.error('No direction defined for Wanderer');
        if(minVerticalSpeed === undefined) return console.error('No minimum V speed defined for Wanderer');
        if(maxVerticalSpeed === undefined) return console.error('No maximum V speed defined for Wanderer');
        if(minHorizontalSpeed === undefined) return console.error('No minimum H speed defined for Wanderer');
        if(maxHorizontalSpeed === undefined) return console.error('No maximum H speed defined for Wanderer');

        this.element = element;
        this.direction = direction;
        this.maxVertSpeed = maxVerticalSpeed;
        this.minVertSpeed = minVerticalSpeed;
        this.maxHorizSpeed = maxHorizontalSpeed;
        this.minHorizSpeed = minHorizontalSpeed;

        this.currentRotationValue = this.element.getAttribute('rotation');
        const crv = this.currentRotationValue;
        this.currentRotation = [Math.floor(crv.x), Math.floor(crv.y)];
        console.log('Direction:', direction);
        this.deltaRotation = [
            this._intRand(-this.maxVertSpeed, this.maxVertSpeed, this.minVertSpeed),
            //-read direction. Keep in mind that "left" means positive rotation and vice versa
            (this.direction === 'right') ?
                this._intRand(-this.maxHorizSpeed, -this.minHorizSpeed) :
                this._intRand(this.minHorizSpeed, this.maxHorizSpeed)
            ];

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
                    this.wanderers.push(new Wanderer({
                        element: element,
                        direction: element.dataset.direction,
                        minHorizontalSpeed: 6,
                        maxHorizontalSpeed: 12,
                        minVerticalSpeed: 1,
                        maxVerticalSpeed: 12,
                    }));
                    if(this.wanderers.length === this.wandererElements.length){
                        resolve(this.wanderers);
                    }
                })
            }
        });
    }
}