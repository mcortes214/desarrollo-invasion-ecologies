// ---- Module variables ----

let draggableElements = [];
let draggingContext = '';
const draggableClass = 'draggable';
const draggingClass = 'dragging';
const draggingContextClass = 'dragging-context';




// ---- Event handling ----

// Variables and functions to handle events in both desktop and mobile

const eventMap = {
    'enter': ['mousedown', 'touchstart'],
    'move': ['mousemove', 'touchmove'],
    'release': ['mouseup', 'touchend'],
}

// Allowed types are 'enter', 'move', 'release'.
// They are mapped to actual events for both touch
// and pointer interfaces by these functions:

const addListener = (element, type, callback) => {
    for (let eventType of eventMap[type]) {
        element.addEventListener(eventType, callback);
    }
}

const removeListener = (element, type, callback) => {
    for (let eventType of eventMap[type]) {
        element.removeEventListener(eventType, callback);
    }
}

//Check for event types
const eventIsReleasingDrag = (event) => eventMap.release.includes(event.type);

//Get target in both desktop and mobile
const getTarget = (event) => event.touches ? event.touches[0].target : event.target;




// ---- Module functions ----

const elementIsDragging = (element) => element.classList.contains(draggingClass);

const mouseIsInsideDraggingContext = (event) => event.path.includes(draggingContext);

const toggleDraggingState = (event) => {
    event.preventDefault();
    const target = getTarget(event);
    
    if ( eventIsReleasingDrag(event) ) {
        target.classList.remove(draggingClass);
        return;
    }
    target.classList.add(draggingClass);
}

const abortAllDraggingMotion = () => {
    //Remove "dragging" class from any dragged element
    const draggedElements = document.querySelectorAll(`.${draggingClass}`);
    for (let element of draggedElements) {
        element.classList.remove(draggingClass);
    }
}

const initPosition = (element) => {
    if (!element.dataset.xPosition) { element.dataset.xPosition = 0; }
    if (!element.dataset.yPosition) { element.dataset.yPosition = 0; }
}

const repositionElement = (element) => {
    initPosition(element);
    element.style.transform = `translate(${element.dataset.xPosition}px, ${element.dataset.yPosition}px)`;
}

const drag = (event) => {
    event.preventDefault();
    const target = getTarget(event);
    //early returns
    if (!elementIsDragging(target)) {
        target.style.zIndex = 0;
        return;
    }
    if (!mouseIsInsideDraggingContext(event)) { return; }
    //Drag
    target.style.zIndex = 10000;
    initPosition(target);
    target.dataset.xPosition = parseInt(target.dataset.xPosition) + event.movementX;
    target.dataset.yPosition = parseInt(target.dataset.yPosition) + event.movementY;
    repositionElement(target);
}




// ---- Setup and Unset functions ----

const addDragEvents = (element) => {
    addListener(element, 'enter', toggleDraggingState);
    addListener(element, 'release', toggleDraggingState);
    addListener(element, 'move', drag);
};

const removeDragEvents = (element) => {
    removeListener(element, 'enter', toggleDraggingState);
    removeListener(element, 'release', toggleDraggingState);
    removeListener(element, 'move', drag);
};

const setupDraggingContext = () => {
    draggingContext = document.querySelector(`.${draggingContextClass}`);
    draggingContext.style.overflow = 'hidden';
    draggingContext.addEventListener('mouseout', abortAllDraggingMotion);
}

const setupDraggableItems = () => {
    draggableElements = document.querySelectorAll(`.${draggableClass}`);
    for (let element of draggableElements) {
        element.style.cursor = 'pointer';
        addDragEvents(element);
        repositionElement(element);
    }
}

const unsetDraggableItems = () => {
    for (let element of draggableElements) {
        element.style.cursor = 'unset';
        removeDragEvents(element);
    }
}

const unsetDraggingContext = () => {
    draggingContext.style.overflow = 'unset';
    draggingContext.removeEventListener('mouseout', abortAllDraggingMotion);
}



// -- Callbacks

const afterInsert = () => {
    return new Promise((resolve) => {
        setupDraggingContext();
        setupDraggableItems();
        resolve();
    });
}

const beforeRemove = () => {
    return new Promise((resolve) => {
        unsetDraggingContext();
        unsetDraggableItems();
        resolve();
    });
}

export default { afterInsert, beforeRemove };




