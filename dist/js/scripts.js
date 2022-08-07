//Inicializar funciones de a-frame
if(document.querySelector('html').classList.contains('aframe')){
    //Wanderers
    const WDR = new Wanderers('.wanderer');
    //Popups
    const greenButtons = document.querySelectorAll('.clickable.green');
    const redButtons = document.querySelectorAll('.clickable.red');
    for(let button of greenButtons){
        button.addEventListener('click', () => {
            alert('* se abre una página de contenido *');
        })
    }
}

