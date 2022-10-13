//Remove any previously loaded scene
//TODO: Implement scripts to run when closing modals.
// App.loadedModules.threeJsScenes.clearScenes();

console.log('testScene.js loaded');

App.loadedModules.threeJsScenes.addScene({
    name: 'testScene',
    containerElement: document.querySelector('#js-three-viewport'),
    format: 'obj',
    modelPath: 'models/rocket.obj',
    width: document.querySelector('#js-three-viewport').getBoundingClientRect().width,
    height: 600,
});





