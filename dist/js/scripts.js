//Inicializar funciones de a-frame
if(document.querySelector('html').classList.contains('aframe')){
    //Wanderers
    const WDR = new Wanderers('.wanderer');
    //Popups
    setupGlobalLoaderListeners(); //TODO: separar entre loaders locales y globales
    setupCloseModalListeners();
}

function setupGlobalLoaderListeners () {
    //Listeners que existen mientras la página esté abierta
    const contentLoaders = document.querySelectorAll('.js-load-content');
    for(let loader of contentLoaders){
        loader.addEventListener('click', (event) => {
            console.log('global click');
            event.preventDefault();
            let element = event.target;
            let link = element.getAttribute('href');
            loadContent(link);
        })
    }
}

function setupLocalLoaderListeners () {
    //Loaders que dejan de existir al cargar un nuevo contenido
    const contentLoaders = document.querySelectorAll('.popup-content-wrapper .js-load-content');
    for(let loader of contentLoaders){
        loader.addEventListener('click', function localContentLoader(event) {
            event.preventDefault();
            let element = event.target;
            element.removeEventListener('click', localContentLoader)
            let link = element.getAttribute('href');
            loadContent(link);
        })
    }
}

function setupCloseModalListeners(){
    const modalClosers = document.querySelectorAll('.js-close-modal');
    for ( let closer of modalClosers ){
        closer.addEventListener('click', (event) => {
            event.preventDefault();
            closePopup();
        })
    }
}

//TODO: Agrupar estas funciones en un componente/clase Popup

function closePopup(){
    const popupBody = document.querySelector('#popup-body');
    const contentWrapper = document.querySelector('.popup-content-wrapper');
    
    if(popupBody.classList.contains('view-fade-in--visible')){
        popupBody.classList.remove('view-fade-in--visible');
    }

    if(popupBody.classList.contains('view-togglable-pointer--active')){
        popupBody.classList.remove('view-togglable-pointer--active');
    }

    if(contentWrapper.classList.contains('view-fade-in--visible')){
        contentWrapper.classList.remove('view-fade-in--visible');
    }
}

function openPopup() {
    const popupBody = document.querySelector('#popup-body');
    if(! popupBody.classList.contains('view-fade-in--visible')){
        popupBody.classList.add('view-fade-in--visible');
    }
    if(! popupBody.classList.contains('view-togglable-pointer--active')){
        popupBody.classList.add('view-togglable-pointer--active');
    }
}


function loadContent(url) {

    openPopup();
    const contentWrapper = document.querySelector('.popup-content-wrapper');

    // Manage content visibility

    //BUG: No abre el popup cuando toco un botón global
    console.log('loading content...');

    const transitionPromise = new Promise((resolve) => {
        //If the popup already has content, wait until it has faded out before resolving:
        if(contentWrapper.classList.contains('view-fade-in--visible')){
            console.log('popup has content');
            contentWrapper.classList.remove('view-fade-in--visible');
            contentWrapper.addEventListener('transitionend', function animationendListener() {
                contentWrapper.removeEventListener('transitionend', animationendListener);
                contentWrapper.classList.add('view-fade-in--visible');
                resolve();
            });
        }
        //Else, resolve immediately:
        else {
            console.log('popup does not have content');
            contentWrapper.classList.add('view-fade-in--visible');
            resolve();
        }
        console.log('transition promise done');
    });

    Promise.all([
        fetch('contents/'+url).then((response) => {
            console.log('content promise done');
            return response.text();
        }),
        transitionPromise
    ])
    .then((returnedValues) => {
        const content = returnedValues[0];
        contentWrapper.innerHTML = content;
        setupLocalLoaderListeners();
    });
}