// Expandable boxes

class ExpandableBox {
    constructor (options) {
        const {element, isExpanded=false} = options;
        if (!element) {
            throw new Error('No element defined for expandable box');
        }
        this.element = element;
        this.innerElement = this.element.querySelector('.js-expandable-box_inner');
        this.name = this.element.dataset.name;
        this.toggleElement = document.querySelector(`.js-expandable-box_toggle[data-name="${this.name}"]`);
        this.isExpanded = isExpanded;
        this.contractedHeight = this.calculateContractedHeight();
        this.storeCurrentBoxSizes();
        this.updateToggleLabel();
        this.toggleElement.addEventListener('click', this.toggleBox.bind(this));
        window.addEventListener('resize', this.storeCurrentBoxSizes.bind(this));

    }

    updateToggleLabel() {
        console.log('toggle label');
        if (this.isExpanded) {
            this.toggleElement.innerText = '[-]';
        }
        else {
            this.toggleElement.innerText = '[+]';
        }
    }

    storeCurrentBoxSizes() {
        this.expandedHeight = this.calculateExpandedHeight();
    }

    calculateExpandedHeight() {
        const contentBoxRect = this.innerElement.getBoundingClientRect();
        return contentBoxRect.height;
    }

    calculateContractedHeight() {
        const outerBoxRect = this.element.getBoundingClientRect();
        return outerBoxRect.height;
    }

    toggleBox() {
        console.log('toggling');
        console.log(this.isExpanded);
        if (this.isExpanded) {
            this.contract();
        }
        else {
            this.expand();
        }
        this.isExpanded = !(this.isExpanded);
        this.updateToggleLabel();
    }

    expand() {
        console.log('expanding');
        this.element.style.height = `${this.expandedHeight + 50}px`;
    }

    contract() {
        console.log('contracting');
        this.element.style.height = `${this.contractedHeight + 50}px`;
    }
}

const afterInsert = () => {
    return new Promise( (resolve) => {
        const expandableBoxes = document.querySelectorAll('.js-expandable-box');
        for (let box of expandableBoxes) {
            console.log(new ExpandableBox({element: box}));
        }
        resolve();
    } );
}

export default { afterInsert };