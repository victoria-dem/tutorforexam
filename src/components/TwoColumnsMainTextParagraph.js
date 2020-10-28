export class TwoColumnsMainTextParagraph {
    constructor(data) {
        this.paragraph = data.paragraph;
    }

    _generateElementWithContent() {
        this.newElement = document.createElement("p");
        this.newElement.classList.add("two-columns__paragraph")
        this.newElement.classList.add("typo")
        this.newElement.classList.add("typo__paragraph")
        this.newElement.textContent = this.paragraph;
        return this.newElement;
    }

    getTwoColumnsMainText() {
        return this._generateElementWithContent();
    }
}
