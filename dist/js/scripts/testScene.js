//Remove any previously loaded scene
//TODO: Implement scripts to run when closing modals.
// App.loadedModules.threeJsScenes.clearScenes();


App.loadedModules.threeJsScenes.addScene({
    name: 'testScene',
    containerElement: document.querySelector('#js-three-viewport'),
    format: 'obj',
    modelPath: 'models/rocket.obj',
    width: document.querySelector('#js-three-viewport').getBoundingClientRect().width,
    height: 600,
});

App.loadedScripts.testScene = {
    testLoadFunction: () => {
        console.log('testScene was loaded successfully');
    },
    testUnloadFunction: () => {
        console.log('testScene was unloaded');
        //Intentar un "delete" para borrar testScene.
        //Si no funciona, ponerlo en un timeout con 0 segundos
        //para que sea llamado desde el scope global y no desde acá adentro
    }
};


const finished = new CustomEvent('scriptexecuted', {
    detail: {
        scriptObject: App.loadedScripts.testScene
    }
})

console.log('testScene finished executing');
document.dispatchEvent(finished);