// -- Module variables

let draggableElements = [];
const draggingClass = 'dragging';
const draggingContextClass = 'dragging-context';



// Event handling (for both desktop and mobile)

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

const releasedDragEvent = (event) => eventMap.release.includes(event.type);

const enteredDragEvent = (event) => eventMap.enter.includes(event.type);

const draggingEvent = (event) => eventMap.move.includes(event.type);

const getTarget = (event) => event.touches ? event.touches[0].target : event.target;

// -- Module functions

const isDragging = (element) => {
    return element.classList.contains(draggingClass);
}

const toggleDraggingState = (event) => {
    event.preventDefault();
    const target = getTarget(event);
    if ( releasedDragEvent(event) ) {
        target.classList.remove(draggingClass);
        return;
    }
    target.classList.add(draggingClass);
}

const drag = (event) => {
    event.preventDefault();
    const target = getTarget(event);
    if (isDragging(target)) {
        console.log('now dragging');
    }
}

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
    document.querySelector(`.${draggingContextClass}`).style.overflow = 'hidden';
}

// -- Callbacks

const afterInsert = () => {
    return new Promise((resolve) => {
        setupDraggingContext();

        //Setup element list declared in module scope
        draggableElements = document.querySelectorAll('.draggable');
        for (let element of draggableElements) {
            addDragEvents(element);
        }
        resolve();
    });
}

const beforeRemove = () => {
    return new Promise((resolve) => {
        console.log('removing draggable');
        //Read module-level element list
        for (let element of draggableElements) {
            removeDragEvents(element);
        }
        resolve();
    });
}

export default { afterInsert, beforeRemove };




