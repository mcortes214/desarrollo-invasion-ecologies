
class Modal {
    constructor(options) {
        const { HTMLUrl, scriptUrl, beforeInsert, afterInsert, beforeRemove, afterRemove } = options;
        this.HTMLUrl = HTMLUrl;
        this.scriptUrl = scriptUrl;
        this.modalFunctions = {beforeInsert, afterInsert, beforeRemove, afterRemove};
        console.log(this.modalFunctions);

        this.HTMLContent = undefined;
        this.modalFunctions = {};
    }

    /** Gets HTML content from the file specified in this.HTMLUrl,
     * and assigns it to this.HTMLContent. All the retrieved content is put
     * inside a wrapper <div> element.
    * @param {object} Options <div> Options object. Available properties: wrapperClasses, wrapperID
    */
    loadHTMLContent(options={}) {
        return new Promise( (resolve) => {
            const { wrapperClasses, wrapperID } = options;
            fetch(this.HTMLUrl)
            .then((response) => {
                return response.text();
            })
            .then((content) => {
                const wrapper = document.createElement('div');
                if (wrapperClasses !== undefined) {
                    for (let className of wrapperClasses) {
                        wrapper.classList.add(className)
                    };
                }
                if (wrapperID !== undefined) wrapper.id = wrapperID;
                //Register content in class property
                wrapper.innerHTML = content;
                this.HTMLContent = wrapper;
                console.log('resolving content');
                resolve();
            });
        });
    }

    fillEmptyFunctions(){
        console.log('filling empty functions');
        //Asignar funciones vacías a las funciones no asignadas
        for(let func of ['beforeInsert', 'afterInsert', 'beforeRemove', 'afterRemove']){
            if (this.modalFunctions[func] === undefined) {
                this.modalFunctions[func] = () => {
                    return new Promise((resolve) => {
                            resolve();
                        });
                    };
            }
        }
    }

    loadFunctions(){
        console.log('loading functions');
        return new Promise((resolve) => {
            if(this.scriptUrl){
                import(this.scriptUrl)
                .then( (module) => {
                    console.log('loading module default into modal functions');
                    this.modalFunctions = module.default;
                    this.fillEmptyFunctions();
                    resolve();
                });
            }
            else {
                //resolve immediately
                this.fillEmptyFunctions();
                console.log('resolving functions');
                resolve();
            }

        });
    }

    loadContentAndFunctions() {
        return new Promise( (resolve) => {
            this.loadHTMLContent({
                wrapperClasses: ['modal-wrapper']
            })
            .then( () => this.loadFunctions() )
            .then( () => { resolve() } );
        } );
    }
}


// Sistema de modales gestionado de forma unificada.
class Modals {
    constructor(options) {
        const { modalsList={}, displayFunction, hidingFunction } = options;
        this.modals = modalsList;
        this.displayFunction = displayFunction;
        this.hidingFunction = hidingFunction;

        this.activeModalName = undefined;
    }


    createModal(name, modalOptions) {
        const modal = new Modal(modalOptions);
        this.modals[name] = modal;
    }

    destroyModal(name) {
        this.modals[name] = undefined;
    }

    displayModal(modalName) {
        this.activeModalName = modalName;
        return new Promise((resolve) => {
            const modal = this.modals[modalName];
            // console.log(App.modalManager.modals[modalName]);
            // console.log(modal);
            modal.modalFunctions.beforeInsert()
            .then(() => {
                return this.displayFunction(modal);
            })
            .then(() => {
                return modal.modalFunctions.afterInsert();
            })
            .then(() => {
                resolve();
            });
        });

    }

    hideModal(name) {
        console.log('modals: hide modal');
        return new Promise((resolve) => {
            
            //Try to close only once, even if triggered many times
            if (this.activeModalName === name) {
                this.activeModalName = undefined;
                console.log('hide modal promise')
                const modal = this.modals[name];
                modal.modalFunctions.beforeRemove()
                .then(() => {
                    return this.hidingFunction(modal);
                })
                .then(() => {
                    return modal.modalFunctions.afterRemove();
                })
                .then(() => {
                    resolve();
                });
            }
            else {
                //If it is not open, resolve immediately without closing
                resolve();
            }


        });
    }

    switchToModal(name) {
        console.log('switching to modal:', name);
        //Si hay algo abierto, cerrarlo
        if (this.activeModalName !== undefined){
            console.log('closing previous modal:', this.activeModalName);
            this.hideModal(this.activeModalName)
            .then( () => {
                console.log('Displaying modal:', name);
                this.displayModal(name);
            })
        }
        else {
            //Si no, simplemente abrir el modal
            console.log('no modal active. Displaying modal:', name)
            this.displayModal(name);
        }
    }
}
