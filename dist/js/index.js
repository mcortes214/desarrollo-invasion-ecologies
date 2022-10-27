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

// const loadModalContentAndScripts = (modalName, scriptUrl) => {
//     return new Promise( () => {
//         const modal = App.modalManager.modals[modalName];
//         modal.loadHTMLContent()
//         .then( () => modal.loadFunctions() )
//         .then( () => { resolve() } );
//     } );
// }

//Inicializar objeto global app
const App = {
    // moduleManager: new ModuleManager(),
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
                console.log(modalWrapper);
                let popup = modalWrapper.querySelector('#popup-main');

                popup.addEventListener('transitionend', function removeModal() {
                    //Event listener de un solo uso
                    popup.removeEventListener('transitionend', removeModal);
                    console.log(modalWrapper);
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

                    //Si el modal no fue creado aún, generarlo
                    if(! App.modalManager.modals[modalName]){
                        setupNewModal(target, modalName);
                        App.modalManager.modals[modalName].loadContentAndFunctions()
                        .then(() => {
                            App.modalManager.displayModal(modalName);
                        })
                    }
                    else {
                        App.modalManager.displayModal(modalName);
                    }
                },
            },
            {
                selector: '.js-close-modal',
                type: 'click',
                callbackFunction: (e) => {
                    e.preventDefault();
                    const target = e.target;
                    const modalName = target.dataset.modalName;
                    //Do something only if we click exactly on the target
                    if(target.classList.contains('js-close-modal')){
                        console.log(modalName);
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



App.aframeScene.addEventListener('loaded', () => {
    //Esperar 1 segundo más y liberar overlay
    setTimeout(() => {
        App.StateComponents.changeState(App.preloader, 'overlay', 'default');
    });
});

App.StateComponents.add('overlay', {
    stateClasses: {
        'default': ['view-fade-in', 'view-togglable-pointer-events'],
        'active': ['view-fade-in--visible', 'view-togglable-pointer-events--active'],
    }
});

//Three.js


//TEST
let testEl = document.createElement('div');
testEl.classList.add('divicito');
let testP = document.createElement('p');
testP.classList.add('js-load-content');
testP.innerText = 'aaddd';
testEl.append(testP);
let body = document.querySelector('body');
body.append(testEl);


