console.log('testScene.js loaded');

//Esto iría acá, en testScene.js.

App.loadedModules.threeJsScenes.addScene({
    name: 'testScene',
    containerElement: document.querySelector('#js-three-viewport'),
    format: 'obj',
    modelPath: 'models/rocket.obj',
    width: document.querySelector('#js-three-viewport').getBoundingClientRect().width,
    height: 600,
});





