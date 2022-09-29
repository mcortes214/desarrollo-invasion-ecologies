//Funciones de modal inicializadas en modal.js
//TODO: refactorizar modales como ¿objetos?
//¿Considerar al DOM del index como un solo objeto mutado por las funciones de modales?

//Inicializar objeto global app
const App = {};
App.aframeScene = document.querySelector('a-scene');
App.preloader = document.querySelector('#app-preloader');

//Inicializar utilidades globales (refactorizar?)
const utils = {
    forceReflow: (el) => {
        el.getBoundingClientRect();
    }
};

//Wanderers
App.wanderers = new Wanderers('.wanderer');
//Asignar event listeners a las figuras para abrir los modales
setupGlobalLoaderListeners();

App.aframeScene.addEventListener('loaded', ()=>{
    //Esperar 1 segundo más y liberar overlay
    setTimeout(() => {
        App.StateComponents.changeState(App.preloader, 'overlay', 'default');
    }, 1000);
});



// Preloader
//TODO: Agregar un método .add() a StateComponents, para poder agregar componentes en distintas secciones

App.StateComponents = new StateComponents({
    'overlay': {
        stateClasses: {
        'default': ['view-fade-in', 'view-togglable-pointer-events'],
        'active': ['view-fade-in--visible', 'view-togglable-pointer-events--active'],
        }
    }
});


