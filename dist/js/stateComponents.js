class StateComponents {
    
    constructor(componentList){
        this.componentList = componentList ? componentList : {};
        if(componentList){
            this.initializeAllComponentsOnDOM();
        }
    }

    initializeAllComponentsOnDOM(parent=document){
        for (let componentName of Object.keys(this.componentList)) {
            this._setupInitialStateOnDOM(componentName, parent);
        }
    }

    //Assign base classes (default) and current state classes to all elements linked to this component
    _setupInitialStateOnDOM(componentName, parent=document) {
        let elements = parent.querySelectorAll(`.js-state-components[data-component-name=${componentName}]`);
        for (let el of elements) {
            //Add defaults
            this._changeStateClassesOfElement(el, componentName, 'default', 'add');
            //Add additional classes of initial declared state
            if (el.dataset.componentState !== 'default') {
                this._changeStateClassesOfElement(el, componentName, el.dataset.componentState, 'add');
            }
        }
    }

    _changeStateClassesOfElement(elem, componentName, componentState, action){
        for (let stateClass of this.componentList[componentName].stateClasses[componentState]) {
            elem.classList[action](stateClass);
        }
    }

    changeState(elem, componentName, newState) {
        const currentState = elem.dataset.componentState;
        //Remove classes of current state (except if it only has default/base classes)
        if(currentState !== 'default') {
            this._changeStateClassesOfElement(elem, componentName, currentState, 'remove');
        }
        //Add new state classes
        this._changeStateClassesOfElement(elem, componentName, newState, 'add');
        //Update current state
        elem.dataset.componentState = newState;
    }

    //Add a new state component
    add(name, componentObject) {
        this.componentList[name] = componentObject;
        //Initialize DOM elements linked to this component
        this._setupInitialStateOnDOM(name);
    }
}