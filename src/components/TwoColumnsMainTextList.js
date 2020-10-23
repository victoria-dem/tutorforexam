export class TwoColumnsMainTextList {
    constructor(data) {
        this.list = data.list;
    }


    _generateElementWithContent() {
        this.newElement = document.createElement("ul");
        this.newElement.classList.add("two-columns__list");
        this.list.forEach( (item) => {
            const newElementItem = document.createElement("li");
            newElementItem.textContent = item;
            newElementItem.classList.add("two-columns__list-item")
            newElementItem.classList.add("typo")
            newElementItem.classList.add("typo__paragraph")
            
            this.newElement.append(newElementItem);
        });
        return this.newElement;
    }

    getTwoColumnsMainText() {
        return this._generateElementWithContent();
    }
}
