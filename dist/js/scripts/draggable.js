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
const getTarget = (event) => event.touches ? event.changedTouches[0].target : event.target;




// ---- Module functions ----

const elementIsDragging = (element) => element.classList.contains(draggingClass);

const mouseIsInsideDraggingContext = (event) => event.path.includes(draggingContext);

const toggleDraggingState = (event) => {
    event.preventDefault();
    const target = getTarget(event);
    
    console.log(event);
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

// const initializePosition = (element) => {
//     if (!element.dataset.xPosition) { element.dataset.xPosition = 0; }
//     if (!element.dataset.yPosition) { element.dataset.yPosition = 0; }
// }

const setupInitialElementPosition = (element) => {
    const prevInitialX = parseInt(element.dataset.initialPositionX) ?? 0;
    const prevInitialY = parseInt(element.dataset.initialPositionY) ?? 0;
    console.log('previous:', prevInitialX, prevInitialY);
    //Actualizar posición inicial
    const rect = element.getBoundingClientRect();
    element.dataset.initialPositionX = rect.x + rect.width/2;
    element.dataset.initialPositionY = rect.y + rect.height/2;
    //TODO: Actualizar xposition e yposition con la diferencia entre initialposition previo y actual
    //para prevenir saltos después de scroll/resize
    element.dataset.xPosition += element.dataset.initialPositionX + prevInitialX;
    element.dataset.yPosition += element.dataset.initialPositionX + prevInitialY;
}

const repositionElement = (element) => {
    // initializePosition(element);
    window.requestAnimationFrame(() => {
        element.style.transform = `translate(${element.dataset.xPosition}px, ${element.dataset.yPosition}px)`;
    })
}

const drag = (event) => {
    event.preventDefault();
    const target = getTarget(event);
    //early returns
    if (!elementIsDragging(target)) { return; }
    if (!mouseIsInsideDraggingContext(event)) { return; }
    //Drag
    // initializePosition(target);
    let initialX = target.dataset.initialPositionX;
    let initialY = target.dataset.initialPositionY;
    let mouseX = event.touches ? event.touches[0].pageX : event.pageX;
    let mouseY = event.touches ? event.touches[0].pageY : event.pageY;
    let newX =  mouseX - initialX;
    let newY = mouseY - initialY;
    target.dataset.xPosition = newX;
    target.dataset.yPosition = newY;
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
        setupInitialElementPosition(element);
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
        //TODO: Revisar, no anda bien
        window.addEventListener('resize', () => {
            for (let element of draggableElements) {
                setupInitialElementPosition(element);
            }
        });
        document.addEventListener('scroll', () => {
            for (let element of draggableElements) {
                setupInitialElementPosition(element);
            }
        }, true);
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




