//Funciones de modal inicializadas en modal.js
//¿Considerar al DOM del index como un solo objeto mutado por las funciones de modales?


//Funciones auxiliares:

const setupNewModal = (dataElement, modalName) => {
    const HTMLUrl = dataElement.getAttribute('href');
    const scriptUrl = dataElement.dataset.scripts;
    const beforeInsert = dataElement.dataset.beforeInsert;
    const afterInsert = dataElement.dataset.afterInsert;
    const beforeRemove = dataElement.dataset.beforeRemove;
    const afterRemove = dataElement.dataset.afterRemove;
    App.modalManager.createModal(
        modalName,
        { HTMLUrl, scriptUrl, beforeInsert, afterInsert, beforeRemove, afterRemove }
    );
}



//Inicializar objeto global app
const App = {
    // moduleManager: new ModuleManager(),
    loadedModules: {},
    StateComponents: new StateComponents(), //TODO: < cambiar por s minúscula en todas partes
    modalManager: new Modals({
        modals: [],
        displayFunction: (modal) => {
            //esperar a final de la transición para pasar a la siguiente etapa
            return new Promise((resolve) => {
                //Hacer una copia del elemento HTML, para desacoplar memoria y DOM
                let HTMLContentClone = modal.HTMLContent.cloneNode(true);
                console.log(HTMLContentClone);
                document.querySelector('body').append(HTMLContentClone);
                App.StateComponents.initializeAllComponentsOnDOM();
                //Force reflow - preparar para transiciones:
                HTMLContentClone.getBoundingClientRect();

                let popup = HTMLContentClone.querySelector('#popup-main');
                popup.addEventListener('transitionend', function addModal() {
                    //Event listener de un solo uso
                    popup.removeEventListener('transitionend', addModal);
                    resolve();
                });
                App.StateComponents.changeState(popup, 'overlay', 'active');
            });

        },
        hidingFunction: () => {
            //esperar a final de la transición para pasar a la siguiente etapa
            console.log('hiding function');
            return new Promise((resolve) => {
                let modalWrapper = document.querySelector('.modal-wrapper');
                let popup = modalWrapper.querySelector('#popup-main');

                popup.addEventListener('transitionend', function removeModal() {
                    //Event listener de un solo uso
                    popup.removeEventListener('transitionend', removeModal);
                    console.log('removing modal wrapper:', modalWrapper);
                    document.querySelector('body').removeChild(modalWrapper);
                    resolve();
                })

                App.StateComponents.changeState(popup, 'overlay', 'default');
            });

        }
    }),
    eventManager: new EventManager({
        parentElement: document.querySelector('body'),
        filter: 'canvas',
        events: [
            {
                selector: '.js-load-content',
                type: 'click',
                callbackFunction: (e) => {
                    e.preventDefault();
                    const target = e.target;
                    const modalName = target.dataset.modalName;

                    console.log(modalName);

                    //Si el modal no fue creado aún, generarlo
                    if(! App.modalManager.modals[modalName]){
                        console.log('Generating new modal from HTML element...')
                        setupNewModal(target, modalName);
                        App.modalManager.modals[modalName].loadContentAndFunctions()
                        .then(() => {
                            App.modalManager.switchToModal(modalName);
                        })
                    }
                    else {
                        console.log('Modal already in memory. Skipping...');
                        App.modalManager.switchToModal(modalName);
                    }
                },
            },
            {
                selector: '.js-close-modal',
                type: 'click',
                callbackFunction: (e) => {
                    const target = e.target;
                    //Do something only if we click exactly on the target
                    if(target.classList.contains('js-close-modal')){
                        e.preventDefault();
                        const modalName = target.dataset.modalName;
                        App.modalManager.hideModal(modalName);
                    }
                },
            }
        ]
    }),
};



//Registrar
App.aframeScene = document.querySelector('a-scene');
App.preloader = document.querySelector('#app-preloader');


//Wanderers
App.wanderers = new Wanderers('.wanderer');

App.StateComponents.add('overlay', {
    stateClasses: {
        'default': ['view-fade-in', 'view-togglable-pointer-events'],
        'active': ['view-fade-in--visible', 'view-togglable-pointer-events--active'],
    }
});


//----- Carga inicial, overlay y modales

let appHasLoaded = false;

App.aframeScene.addEventListener('loaded', () => {
    //Si tomó más de 5 segundos para cargar, ignorar
    if(appHasLoaded) { return };
    
    //Si no, esperar 1 segundo más y liberar overlay
    setTimeout(() => {
        console.log('releasing overlay in 1 second');
        appHasLoaded = true;
        initStartSequence();
    }, 1000);
});

//Si nunca se dispara el evento "loaded", liberar overlay igual después de 5 segundos
setTimeout(() => {
    //Ignorar si aframe ya cargó
    if(appHasLoaded) { return };
    console.log('a-frame not loaded after 5 seconds - bailing and releasing overlay');
    appHasLoaded = true;
    initStartSequence();
}, 5000);


function initStartSequence() {
    App.StateComponents.changeState(App.preloader, 'overlay', 'default');
    setTimeout(() => {
        loadIntroModal();
    }, 3000);
}

//Crear y cargar primer modal de presentación

function loadIntroModal(){
    const modalName = 'presentacion-01';
    //Crear modal, sin scripts (ya no usa spanify sino pre-baked spans)
    App.modalManager.createModal(modalName, { HTMLUrl: 'contents/presentacion-01.html' });
    App.modalManager.modals[modalName].loadContentAndFunctions()
    .then(() => {
        App.modalManager.switchToModal(modalName);
    })
}
