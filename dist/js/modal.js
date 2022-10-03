
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


//Self-removing listeners
function setupLocalClosingListeners(wrapper) {
    const contentClosers = wrapper.querySelectorAll('.js-close-modal');

    for(let closer of contentClosers){
        closer.addEventListener('click', function localContentCloser(event) {
            event.preventDefault();
            let element = event.target;
            if(element.classList.contains('js-close-modal')){
                element.removeEventListener('click', localContentCloser);
                //Ocultar y eliminar contenido actual
                hideModal(wrapper).then(() => {
                    wrapper.remove();
                });
            }

        });
    }
}


function setupGlobalLoaderListeners () {
    //Listeners que existen mientras la página esté abierta
    const contentLoaders = document.querySelectorAll('.js-load-content');
    for(let loader of contentLoaders){
        loader.addEventListener('click', (event) => {
            event.preventDefault();
            let link = event.target.getAttribute('href');
            let scripts = event.target.dataset.scripts ? JSON.parse(event.target.dataset.scripts) : [];
            let dependencies = event.target.dataset.dependencies ? JSON.parse(event.target.dataset.dependencies) : [];
            loadModal({
                link: link,
                scripts: scripts,
                dependencies: dependencies,
            });
        })
    }
}

function setupLocalLoaderListeners (wrapper) {
    //Loaders que dejan de existir al cargar un nuevo contenido
    const contentLoaders = wrapper.querySelectorAll('.js-load-content');
    for(let loader of contentLoaders){
        loader.addEventListener('click', function localContentLoader(event) {
            event.preventDefault();
            let element = event.target;
            element.removeEventListener('click', localContentLoader);
            let link = element.getAttribute('href');
            let scripts = element.dataset.scripts ? JSON.parse(element.dataset.scripts) : [];
            let dependencies = element.dataset.scripts ? JSON.parse(element.dataset.dependencies) : [];

            //Eliminar contenido actual, y después mostrar el nuevo contenido
            hideModal(wrapper).then(() => {
                wrapper.remove();
                loadModal({
                    link: link,
                    scripts: scripts,
                    dependencies: dependencies,
                });
            });
        });
    }
}


function hideModal(wrapper){
    const popupBody = wrapper.querySelector('#popup-main');
    return new Promise((resolve, reject) => {
        popupBody.addEventListener('transitionend', () => { resolve(); });
       
        if(popupBody.classList.contains('view-fade-in--visible')){
            popupBody.classList.remove('view-fade-in--visible');
        }
       
        if(popupBody.classList.contains('view-togglable-pointer-events--active')){
            popupBody.classList.remove('view-togglable-pointer-events--active');
        }
    });
}

// function showModal(wrapper) {
//     const popupBody = wrapper.querySelector('#popup-main');

//     if(! popupBody.classList.contains('view-fade-in--visible')){
//         popupBody.classList.add('view-fade-in--visible');
//     }
//     if(! popupBody.classList.contains('view-togglable-pointer-events--active')){
//         popupBody.classList.add('view-togglable-pointer-events--active');
//     }
// }


function loadModal(options){
    let {link, scripts, dependencies} = options;
    if ([link, scripts, dependencies].some((value) => {return value === undefined})){
        throw 'undefined arguments found for loadModal';
    }

    //Después de obtener un elemento HTML con contenido:
    getContent({url: link}).then((wrapper) => {
        //1- Load dynamic DOM content    
        document.querySelector('body').append(wrapper); //agregar el contenido
        utils.forceReflow(wrapper); //Forzar reflow; preparar para transiciones
        setupLocalLoaderListeners(wrapper);
        setupLocalClosingListeners(wrapper);

        const modal = wrapper.querySelector('#popup-main');
        if(! modal.classList.contains('view-fade-in--visible')){
            modal.classList.add('view-fade-in--visible');
        }
        if(! modal.classList.contains('view-togglable-pointer-events--active')){
            modal.classList.add('view-togglable-pointer-events--active');
        }

        //2- Add scripts to the wrapper we just added to the DOM
        registerScriptDependencies(dependencies)
        .then(() => {registerDynamicScripts(scripts, wrapper)});
    });

}

function registerScriptDependencies(scriptsToLoad){
    return new Promise((resolve) => {

        const scriptLoadedPromises = [];
        const alreadyLoadedScripts = [...document.querySelectorAll('script')].map(script => script.src);

        for(let scriptUrl of scriptsToLoad){
                if ( alreadyLoadedScripts.some(url => url.includes(scriptUrl)) ){
                    console.log(`${scriptUrl} already registered. Skipping`);
                    continue;
                }
                //Add script to the document
                const scriptElement = document.createElement('script');
                scriptElement.src = scriptUrl;
                document.querySelector('body').append(scriptElement);
                //Tell the function to wait for this script to finish loading before resolving
                scriptLoadedPromises.push(getScriptLoadedPromise(scriptElement));
        }

        //Resolve after every dependency has loaded
        if(scriptLoadedPromises.length > 0){
            Promise.all(scriptLoadedPromises).then(() => {resolve()});
        }
        //Or resolve immediately if there is nothing to load
        else {
            resolve();
        }
    });
}

function getScriptLoadedPromise(scriptElement) {
    return new Promise((resolve) => {
        scriptElement.addEventListener('load', () => {
            resolve();
        })
    });
}

function registerDynamicScripts(scripts, wrapper){
    for (let scriptUrl of scripts){
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptUrl;
        wrapper.append(scriptElement);
    }

}

//Devuelve un div contenedor ("wrapper"), que adentro tiene el contenido recuperado del HTML.
//Asigna al wrapper las clases e ID pasadas desde las opciones.
function getContent(options) {
    return new Promise((resolve) => {

        const {url, wrapperClasses, wrapperId, parent} = options;
        fetch('contents/'+url).then((response) => {
            return response.text();
        })
        .then((content) => {
            const wrapper = document.createElement('div');
            if(wrapperClasses !== undefined) {
                for(let className of wrapperClasses) { wrapper.classList.add(className) };
            }
            if(wrapperId !== undefined) wrapper.id = wrapperId;
            wrapper.innerHTML = content;
            resolve(wrapper);
        });

    });
}


