class ModuleManager {
    constructor(){
        this.scripts = {};
    }

    loadScript(globalReference="window", name="script", path="", parent=document.querySelector('body')){
        //crear dinámicamente un script de type module,
        const tagId = `scrMgr_${name}`;
        const scr = document.createElement('script');
        scr.setAttribute('type', 'module');
        scr.id = tagId;

        //y asignarle un string como código, para que se registre en this.scripts
        scr.innerHTML = `
            import scriptImport from '${path}';
            ${globalReference}.scripts["${name}"] = {
                module: scriptImport,
                tagId: '${tagId}',
            };
            console.log(scriptImport);
            //document.querySelector('#${tagId}').remove(); //descomentar para auto-eliminar
        `;

        //y hacer un append a body para que se ejecute
        document.querySelector('body').append(scr);
    }
    

    removeScript(name) {
        //Eliminar referencias para el garbage collector
        this.scripts[name] = undefined;
    }
}

//Función que devuelve el objeto

function loadAndExtractModule(name="extractedModule", absoluteRefToParentObject="window", path="") {
    //Crear un script tag que guarde los exports del módulo como propiedad de un objeto parent
    const dummyScriptTag = document.createElement('script');
    dummyScriptTag.setAttribute('type', 'module');
    dummyScriptTag.innerHTML = `
        import scriptImport from '${path}';
        ${absoluteRefToParentObject}["${name}"] = scriptImport;
        console.log(scriptImport);
        //document.querySelector('#${tagId}').remove(); //descomentar para auto-eliminar
    `;
    //y añadirlo a body para que se ejecute
    document.querySelector('body').append(dummyScriptTag);
}