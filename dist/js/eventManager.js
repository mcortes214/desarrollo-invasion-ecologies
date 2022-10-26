class EventManager {
    constructor(options){
        this.parentElement = options.parentElement ?
            options.parentElement :
            document.querySelector('body');
        this.events = options.events ? options.events : [];
        this.filter = options.filter ? options.filter : '';
        this.setupInitialListeners();
        this.setupObserver();
    }

    //Setup event listeners on page load
    setupInitialListeners(){
        this.assignEvents([document.querySelector('body')]);
    }

    //Observe for changes to add new listeners if needed
    setupObserver(){
        this.observer = new MutationObserver( (mutationList, observer) => {
            //Get list of elements added to DOM
            let newElements = this.getNewlyAddedElements(mutationList);

            //For each new element,
            this.assignEvents(newElements);
        } );

        this.observer.observe(this.parentElement, {
            childList: true,
            attributes: false,
            subtree: true
        });
    }

    assignEvents(newElements) {
        for (let newElement of newElements) {

            //Check if any child has a class that needs an event listener
            for (let listenerObject of this.events) {
                const listenerSelector = listenerObject.selector;
                const eventListenerElements = newElement.querySelectorAll(listenerSelector);

                //If there are any, assign event listeners
                if (eventListenerElements.length > 0) {
                    for (let element of eventListenerElements) {
                        element.addEventListener(listenerObject.type, (e) => {
                            listenerObject.callbackFunction(e);
                        });
                    }
                }
            }
        }
    }

    getNewlyAddedElements(mutationList) {
        const filteredMutationList = mutationList.filter((mutation) => {
            return (!mutation.target.matches(this.filter));
        });

        let addedElementList;
        
        //If a relevant mutation happens,
        if (filteredMutationList.length > 0) {
            //get newly added nodes,
            addedElementList = filteredMutationList.map(m => m.addedNodes)
                //and flatten them in one array
                .reduce((acc, el) => {
                    el.forEach(node => acc.push(node));
                    return acc;
                }, [])
                //keeping only query-able nodes (no scripts, text, etc.)
                .filter(node => typeof node.querySelector === "function");
        }

        return addedElementList;
    }
}