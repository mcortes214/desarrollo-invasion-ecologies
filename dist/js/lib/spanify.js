console.log('spanify dependency loaded');

class Spanify {
    constructor(){}

    render(options){
        let {containerClass, spanClasses} = options;
        this.containerClass = containerClass;
        this.containerElement = document.querySelector(this.containerClass);
        
        //Crear un array con split(' ')
        this.textArray = this.containerElement.innerText.split(' ');
        //Borrar el contenido del contenedor
        this.containerElement.innerHTML = '';
        //Para cada elemento del array, crear un elemento span y rellenarlo con el texto y sus clases
        for (let word of this.textArray){
            const wordElement = document.createElement('span');
            wordElement.innerText = word;
            for(let spanClass of spanClasses) {
                wordElement.classList.add(spanClass);
            }
            //append() el elemento span al contenedor
            this.containerElement.append(wordElement);
            this.containerElement.append(' ');
        }
        //Preparar nuevo elemento para animación/transiciones? Es necesario?
        utils.forceReflow(this.containerElement);
    };
}

App.spanify = new Spanify(); //Registrar en objeto global App

