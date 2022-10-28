//Remove any previously loaded scene
//TODO: Implement scripts to run when closing modals.
// App.loadedModules.threeJsScenes.clearScenes();

import ThreeJsScenes from "../lib/threeJsScenes.js";

const afterInsert = () => {
    return new Promise((resolve) => {
        App.loadedModules.threeJsScenes = new ThreeJsScenes();

        App.loadedModules.threeJsScenes.addScene({
            name: 'testScene',
            containerElement: document.querySelector('#js-three-viewport'),
            format: 'obj',
            modelPath: 'models/rocket.obj',
            width: document.querySelector('#js-three-viewport').getBoundingClientRect().width,
            height: 600,
        });

        resolve();
    });
}

const afterRemove = () => {
    return new Promise((resolve) => {
        console.log('unloading test scene');
        resolve();
    });
}

//Intentar un "delete" para borrar testScene.
//Si no funciona, ponerlo en un timeout con 0 segundos
//para que sea llamado desde el scope global y no desde acá adentro

export default { afterInsert, afterRemove };