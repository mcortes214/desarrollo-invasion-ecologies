
//TODO: Agrupar estas funciones en un componente/clase Modal

/*
TODO:

Modelar toda la parte de modales de la siguiente manera:

- .js-content-loader es un componente de comportamiento.
Hay un gestor de componentes que rastrea esa clase en el DOM y añade
event listeners o nuevas clases en el setup, basado en un objeto-modelo
de ese componente (igual que los state components)

- setupModalListeners: solo agrega listeners de apertura/cierre, y pasa como callback una
función que gestiona la apertura/cierre de modales.

- swapModal(target): función que cierra un modal (de haberlo) y abre otro. Llama
a las funciones destroyModal() y loadModal(). En algún lado debería haber una
propiedad que guarde una referencia al wrapper actual, generado por loadModal().

- destroyModal(current): Realiza dos acciones en secuencia:
* App.stateComponents.changeState(modal, 'overlay', 'invisible')
* .then( (wrapper) => { wrapper.remove } );

- getContent(url): está perfecto como está. Solo retorna un div de contenido.

- addModal(wrapper): Realiza cuatro acciones en secuencia:
* agrega el wrapper al DOM. then ->
*   agrega event listeners a los elementos del DOM (inicializa localmente behavior/state components).
*   registra dependencias de JS. then ->
*       carga scripts locales al final del DOM.
Cada una de estas tareas es llamada por una sola línea de código o función.

registerScriptDependencies(scripts): Registra dependencias de forma global y persistente.

registerDynamicScripts(scripts, wrapper): Agrega scripts a un wrapper y los ejecuta.

*/

class Modal {
    constructor(options) {
        const { link, scripts, dependencies, onLoad, onUnload, onInsert, showingFunction, modalSelector } = options;
        this.link = link;
        this.scripts = scripts;
        this.dependencies = dependencies;
        this.onLoad = onLoad;
        this.onUnload = onUnload;
        this.onInsert = onInsert;
        this.showingFunction = showingFunction;
        this.modalSelector = modalSelector;

        this.content = '';
    }

    //Appends this.content to the DOM and prepares it for transitions
    insert(wrapper) {
        //1- Load dynamic DOM content    
        document.querySelector('body').append(wrapper); //agregar el contenido
        this.onInsert();
        utils.forceReflow(wrapper); //Forzar reflow; preparar para transiciones
        this.setupLocalLoaderListeners(wrapper);
        this.setupLocalClosingListeners(wrapper);

        console.log(wrapper);
        const modal = wrapper.querySelector(this.modalSelector);
        console.log(wrapper);
        this.showingFunction(modal);
    }

    //Public method: Loads, inserts and shows the modal.
    render(){
        console.log('rendering modal');
        this.load().then( () => {
            this.insert(this.content);
            this.show();
        } );
        
    }

    show(){
        console.log('showing modal');
    }

    //Implements getContent, registerScriptDependencies and registerDynamicScripts.
    //Fetches HTML content, scripts and dependencies, and updates body tag + this.content.
    load() {
        return new Promise( (resolve) => {
            this.getContent({ url: this.link }).then((wrapper) => {
                this.content = wrapper;
                console.log(this);
                console.log('cargando dependencias');
                this.registerScriptDependencies(this.dependencies).then(() => {
                    //Cargar funciones de script como propiedades de clase
                    console.log('cargando funciones de script en propiedad de Modal');
                    console.log(this.scripts);
                    this.registerDynamicScripts(this.scripts, this.content);
                    //Cuando todo este cargado, y/o ejecutado,
                    //resolver
                    resolve();
                });
            });
        } );
    }

    // --- Fetching functions ---

    //Fetches only HTML content
    getContent(options) {
        return new Promise((resolve) => {

            const { url, wrapperClasses, wrapperId, parent } = options;
            fetch('contents/' + url).then((response) => {
                return response.text();
            })
                .then((content) => {
                    const wrapper = document.createElement('div');
                    if (wrapperClasses !== undefined) {
                        for (let className of wrapperClasses) { wrapper.classList.add(className) };
                    }
                    if (wrapperId !== undefined) wrapper.id = wrapperId;
                    wrapper.innerHTML = content;
                    resolve(wrapper);
                });

        });
    }

    //TODO: Cómo registrarlo en objeto global sin crear un hard link?
    //Fetchear y descargar las dependencias desde acá, retornar el script tag
    //a index.js y gestionarlo desde ahí

    registerScriptDependencies(scriptsToLoad) {
        return new Promise((resolve) => {

            //TODO: Llevar registro de dependencias cargadas en App, y no en el DOM.
            //No debería ser _necesario_, porque nada va a borrar los script tags del DOM,
            //Así que dejarlo para lo último.
            const scriptLoadedPromises = [];
            const alreadyLoadedScripts = [...document.querySelectorAll('script')].map(script => script.src);

            //TODO: Ver si podemos convertir esto en un map/filter. Así no se complejiza demasiado.
            for (let scriptToLoad of scriptsToLoad) {
                //Verificar si tenemos un string solo (shortcut), o un objeto con atributos
                let hasConfigObject = typeof scriptToLoad === 'object';

                let scriptUrl = hasConfigObject ?
                    scriptToLoad.src :
                    scriptToLoad;

                //Verificar que la dependencia no se haya registrado ya

                if (alreadyLoadedScripts.some(url => url.includes(scriptUrl))) {
                    console.log(`${scriptUrl} already registered. Skipping`);
                    continue;
                }

                //Add script to the document
                const scriptElement = document.createElement('script');

                if (hasConfigObject) {
                    for (let prop in scriptToLoad) {
                        scriptElement.setAttribute(prop, scriptToLoad[prop]);
                    }
                }
                else { scriptElement.src = scriptUrl; }

                document.querySelector('body').append(scriptElement);
                console.log(`registered ${scriptUrl} as body tag`);

                //Tell the function to wait for this script to finish loading before resolving
                scriptLoadedPromises.push(this.getScriptLoadedPromise(scriptElement));
            }

            //Resolve after every dependency has loaded
            if (scriptLoadedPromises.length > 0) {
                Promise.all(scriptLoadedPromises).then(() => { resolve() });
            }
            //Or resolve immediately if there is nothing to load
            else {
                resolve();
            }
        });
    }

    registerDynamicScripts(scripts, wrapper) {
        return new Promise((resolve) => {
            let scriptLoadedPromises = [];

            for (let scriptUrl of scripts) {
                const scriptElement = document.createElement('script');
                scriptElement.src = scriptUrl;
                console.log(wrapper);
                wrapper.append(scriptElement);

                scriptLoadedPromises.push(this.getScriptLoadedPromise(scriptElement));
            }

            if (scriptLoadedPromises.length > 0) {
                console.log(scriptLoadedPromises);

                Promise.all(scriptLoadedPromises).then(() => { resolve() });
            }
            else {
                resolve(App.loadedScripts['testScene']);
            }
        });
    }

    //Helper function for script loading
    getScriptLoadedPromise(scriptElement) {
        return new Promise((resolve) => {
            scriptElement.addEventListener('load', () => {
                resolve();
            })
        });
    }

    // --- Event listener functions ---

    setupLocalClosingListeners(wrapper) {
        console.log('setting up local closing listeners');
        // const contentClosers = wrapper.querySelectorAll('.js-close-modal');

        // for (let closer of contentClosers) {
        //     closer.addEventListener('click', function localContentCloser(event) {
        //         event.preventDefault();
        //         let element = event.target;
        //         if (element.classList.contains('js-close-modal')) {
        //             element.removeEventListener('click', localContentCloser);
        //             //Ocultar y eliminar contenido actual
        //             this.hideModal(wrapper).then(() => {
        //                 wrapper.remove();
        //             });
        //         }

        //     }.bind(this));
        // }
    }

    setupLocalLoaderListeners(wrapper) {
        console.log('setting up local loader listeners');
        // //Loaders que dejan de existir al cargar un nuevo contenido
        // const contentLoaders = wrapper.querySelectorAll('.js-load-content');
        // for (let loader of contentLoaders) {
        //     loader.addEventListener('click', function localContentLoader(event) {
        //         event.preventDefault();
        //         let element = event.target;
        //         element.removeEventListener('click', localContentLoader);
        //         let link = element.getAttribute('href');
        //         let scripts = element.dataset.scripts ? JSON.parse(element.dataset.scripts) : [];
        //         let dependencies = element.dataset.scripts ? JSON.parse(element.dataset.dependencies) : [];

        //         //Eliminar contenido actual, y después mostrar el nuevo contenido
        //         this.hideModal(wrapper).then(() => {
        //             wrapper.remove();
        //             this.loadModal({
        //                 link: link,
        //                 scripts: scripts,
        //                 dependencies: dependencies,
        //             });
        //         });
        //     }.bind(this));
        // }
    }

}



// Sistema de modales gestionado de forma unificada.
class Modals {
    constructor(options) {
        const { modalSelector, afterInsertFunction, showingFunction, hidingFunction } = options;
        this.modalSelector = modalSelector;
        this.showingFunction = showingFunction;
        this.hidingFunction = hidingFunction;
        this.afterInsertFunction = afterInsertFunction;
        //Lista de objetos Modal cargados.
        this.modals = {};
        this.setupGlobalLoaderListeners();
    }

    //TODO: Gestionar listeners con un EventManager general
    setupGlobalLoaderListeners() {
        // //Listeners que existen mientras la página esté abierta
        // const contentLoaders = document.querySelectorAll('.js-load-content');
        // for (let loader of contentLoaders) {
        //     loader.addEventListener('click', (event) => {
        //         //Open modal preloader
        //         //[TODO]

        //         //Get modal information from link
        //         event.preventDefault();
        //         let element = event.target;
        //         this.generateModalFromDOM(element);
        //     })
        // }
    }

    generateModalFromDOM(element) {
        console.log('generando un modal desde DOM');
        let link = element.getAttribute('href');
        let scripts = element.dataset.scripts ? JSON.parse(element.dataset.scripts) : [];
        let dependencies = element.dataset.dependencies ? JSON.parse(element.dataset.dependencies) : [];
        let onLoad = element.dataset.onLoad ? element.dataset.onLoad : '';
        let onUnload = element.dataset.onUnload ? element.dataset.onUnload : '';
        let onInsert = this.afterInsertFunction;
        let showingFunction = this.showingFunction;
        let modalSelector = this.modalSelector;
        //TODO: el atributo Name tiene que venir del DOM (data-modal-name)
        let name = 'testModal';
        //Create Modal object:
        const modal = new Modal({
            link, scripts, dependencies, onLoad, onUnload, onInsert, showingFunction, modalSelector });
        this.modals[name] = modal;
        modal.render();
        // this.loadModal({ link, scripts, dependencies, onLoad, onUnload });
    }

    // loadModal(options) {
    //     let { link, scripts, dependencies, onLoad, onUnload } = options;
    //     if ([link, scripts, dependencies, onLoad, onUnload].some((value) => { return value === undefined })) {
    //         throw 'undefined arguments found for loadModal';
    //     }

    //     //Después de obtener un elemento HTML con contenido:
    //     this.getContent({ url: link }).then((wrapper) => {
    //         //1- Load dynamic DOM content    
    //         document.querySelector('body').append(wrapper); //agregar el contenido
    //         this.afterInsertFunction();
    //         utils.forceReflow(wrapper); //Forzar reflow; preparar para transiciones
    //         this.setupLocalLoaderListeners(wrapper);
    //         this.setupLocalClosingListeners(wrapper);

    //         const modal = wrapper.querySelector(this.modalSelector);
    //         this.showingFunction(modal);

    //         //2- Add scripts to the wrapper we just added to the DOM
    //         this.registerScriptDependencies(dependencies)
    //             .then(() => {
    //                 document.addEventListener('scriptexecuted', () => {
    //                     console.log('some script executed');
    //                 })
    //                 this.registerDynamicScripts(scripts, wrapper);
    //             })
    //     });
    // }

    getContent(options) {
        return new Promise((resolve) => {

            const { url, wrapperClasses, wrapperId, parent } = options;
            fetch('contents/' + url).then((response) => {
                return response.text();
            })
                .then((content) => {
                    const wrapper = document.createElement('div');
                    if (wrapperClasses !== undefined) {
                        for (let className of wrapperClasses) { wrapper.classList.add(className) };
                    }
                    if (wrapperId !== undefined) wrapper.id = wrapperId;
                    wrapper.innerHTML = content;
                    resolve(wrapper);
                });

        });
    }



    hideModal(wrapper) {
        const modal = wrapper.querySelector(this.modalSelector);
        return new Promise((resolve, reject) => {
            modal.addEventListener('transitionend', () => { resolve(); });
            this.hidingFunction(modal);
            // if(popupBody.classList.contains('view-fade-in--visible')){
            //     popupBody.classList.remove('view-fade-in--visible');
            // }

            // if(popupBody.classList.contains('view-togglable-pointer-events--active')){
            //     popupBody.classList.remove('view-togglable-pointer-events--active');
            // }
        });
    }






}


