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
        this.deltaRotation = [
            this._intRand(-this.maxVertSpeed, this.maxVertSpeed, this.minVertSpeed),
            //-read direction. Keep in mind that "left" means positive rotation and vice versa
            (this.direction === 'right') ?
                this._intRand(-this.maxHorizSpeed, -this.minHorizSpeed) :
                this._intRand(this.minHorizSpeed, this.maxHorizSpeed)
            ];

        this.element.addEventListener('animationcomplete', () => {
            return this.animateWanderer();
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

    animateWanderer(){
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
        this.wandererElements = [...document.querySelectorAll(query)];
        this.loadedWandererElements = [];
        this.wanderers = [];

        //Once everything is loaded, begin animation chain
        this.setup().then((wandererObjects) => {
            for (let wanderer of wandererObjects){
                wanderer.animateWanderer();
            }
        });
    }

    _createWanderersFromElements(){
        for ( let element of this.wandererElements ){
            this.wanderers.push(new Wanderer({
                element: element,
                direction: element.dataset.direction,
                minHorizontalSpeed: 6,
                maxHorizontalSpeed: 6 + (6 * element.dataset.speedModifier), //keep between 6 and 12
                minVerticalSpeed: 1,
                maxVerticalSpeed: 6 + (6 * element.dataset.speedModifier),
            }));
        }
    }

    setup(){
        return new Promise((resolve, reject) => {
            //Test for all elements loaded
            //NOT using 'loaded' event because it might fire before execution of this file
            let wandererLoadInterval = window.setInterval(() => {
                this.loadedWandererElements = this.wandererElements.filter( (cur) => {
                    return cur.hasLoaded;
                });
                if(this.loadedWandererElements.length === this.wandererElements.length) {
                    // Populate this.wanderers with Wanderer instances
                    this._createWanderersFromElements();
                    // Clear load interval and resolve
                    clearInterval(wandererLoadInterval);
                    resolve(this.wanderers);
                }
            }, 500);
        });
    }
}

//TODO: Unificar lógica de dependency loaders y dependencias:
//que los loaders no incluyan las clases, sino que las clases sean
//archivos separados igual que este