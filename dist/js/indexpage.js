let modalContainers = document.querySelectorAll('.modal-container');

let modals = [...modalContainers].map((container) => {
    return {
        container: container,
        name: container.dataset.modalName,
    }
});

let modalOpeners = document.querySelectorAll('.js-load-content');
let modalClosers = document.querySelectorAll('.js-close-modal');

for (let closer of modalClosers) {
    closer.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('js-close-modal')){
            closeModal(target.dataset.modalName);
        }
    })
}

for (let opener of modalOpeners) {
    opener.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('js-load-content')){
            e.preventDefault();
            openModal(target.dataset.modalName);
        }
    })
}

function openModal(modalName) {
    let modalContainer = document.querySelector(`.modal-container[data-modal-name="${modalName}"]`);
    modalContainer.style.opacity = 1;
    modalContainer.style.pointerEvents = 'all';
    console.log(modalContainer);
}

function closeModal(modalName) {
    let modalContainer = document.querySelector(`.modal-container[data-modal-name="${modalName}"]`);
    modalContainer.style.opacity = 0;
    modalContainer.style.pointerEvents = 'none';
    console.log(modalContainer);
}