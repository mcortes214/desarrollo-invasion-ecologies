class StateComponents {
    
    constructor(componentList){
        this.componentList = componentList ? componentList : {};
        if(componentList){
            this._initializeAllComponentsOnDOM();
        }
    }

    _initializeAllComponentsOnDOM(){
        for (let component in this.componentList) {
            _setupInitialStateOnDOM(component);
        }
    }

    //Assign base classes (default) and current state classes to all elements linked to this component
    _setupInitialStateOnDOM(component) {
        let elements = document.querySelectorAll(`.js-state-components[data-component-name=${component}]`);
        for (let el of elements) {
            //Add defaults
            this._changeStateClassesOfElement(el, component, 'default', 'add');
            //Add additional classes of initial declared state
            if (el.dataset.componentState !== 'default') {
                this._changeStateClassesOfElement(el, component, el.dataset.componentState, 'add');
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
        _setupInitialStateOnDOM(this.componentList[name]);
    }
}