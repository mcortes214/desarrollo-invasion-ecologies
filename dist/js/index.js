//Funciones de modal inicializadas en modal.js
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
App.modals = new Modals({
    modalSelector: '#popup-main',
    afterInsertFunction: () => {
        App.StateComponents.initializeAllComponentsOnDOM();
    },
    showingFunction: (popup) => {
        App.StateComponents.changeState(popup, 'overlay', 'active');
    },
    hidingFunction: (popup) => {
        App.StateComponents.changeState(popup, 'overlay', 'default');
    }
});

App.aframeScene.addEventListener('loaded', () => {
    //Esperar 1 segundo más y liberar overlay
    setTimeout(() => {
        App.StateComponents.changeState(App.preloader, 'overlay', 'default');
    });
});


App.StateComponents = new StateComponents();

App.StateComponents.add('overlay', {
    stateClasses: {
        'default': ['view-fade-in', 'view-togglable-pointer-events'],
        'active': ['view-fade-in--visible', 'view-togglable-pointer-events--active'],
    }
});