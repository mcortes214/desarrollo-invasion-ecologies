class StateComponents {
    constructor(componentList){
        this.componentList = componentList ? componentList : {};
        if(componentList){
            this.setupDefaults();
        }
    }

    setupDefaults(){
        for (let component in this.componentList) {
            let elements = document.querySelectorAll(`.js-state-components[data-component-name=${component}]`);
            for (let el of elements) {

                //Add defaults
                this._changeStateClassesOfElement(el, component, 'default', 'add');

                //Add additional classes of declared state
                if (el.dataset.componentState !== 'default') {
                    this._changeStateClassesOfElement(el, component, el.dataset.componentState, 'add');
                }
            }
        }
    }

    _changeStateClassesOfElement(elem, componentName, componentState, action){
        console.log(this.componentList[componentName].stateClasses[componentState]);
        for (let stateClass of this.componentList[componentName].stateClasses[componentState]) {
            elem.classList[action](stateClass);
        }
    }

    changeState(elem, componentName, newState) {
        const currentState = elem.dataset.componentState;
        if(currentState !== 'default') {
            this._changeStateClassesOfElement(elem, componentName, currentState, 'remove');
        }
        this._changeStateClassesOfElement(elem, componentName, newState, 'add');
        elem.dataset.componentState = newState;
    }
}