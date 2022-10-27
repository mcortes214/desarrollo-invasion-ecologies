
class Modal {
    constructor(options) {
        const { HTMLUrl, scriptUrl,
            beforeInsert = ()=>{},
            afterInsert = ()=>{},
            beforeRemove = ()=>{},
            afterRemove = ()=>{}
        } = options;
        this.HTMLUrl = HTMLUrl;
        this.scriptUrl = scriptUrl;
        this.beforeInsert = beforeInsert;
        this.afterInsert = afterInsert;
        this.beforeRemove = beforeRemove;
        this.afterRemove = afterRemove;

        this.HTMLContent = undefined;
        this.modalFunctions = undefined;
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
                resolve();
            });
        });
    }

    loadFunctions(){
        return new Promise((resolve) => {
            import(this.scriptUrl)
            .then( (module) => {
                this.modalFunctions = module.default;
                resolve();
            });
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
        return new Promise((resolve) => {
            const modal = this.modals[modalName];
            modal.modalFunctions.beforeInsert()
            .then(() => {
                return this.displayFunction(modal);
            })
            .then(() => {
                return modal.modalFunctions.afterInsert();
            })
            .then(() => {
                this.activeModalName = modalName;
                resolve();
            });
        });

    }

    hideModal(name) {
        return new Promise((resolve) => {
            const modal = this.modals[name];
            modal.modalFunctions.beforeRemove()
            .then(() => {
                return this.hidingFunction(modal);
            })
            .then(() => {
                return modal.modalFunctions.afterRemove();
            })
            .then(() => {
                this.activeModalName = undefined;
                resolve();
            });
        });
    }

    switchToModal(name) {
        this.hideModal(this.activeModalName)
        .then( () => {this.displayModal(name)} )
    }
}
