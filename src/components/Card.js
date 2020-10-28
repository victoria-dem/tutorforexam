export class Card {
    constructor(data,templateSelector,elementSelector) {
        this.linkPng = data.linkPng;
        this.linkWebp = data.linkWebp;
        this.alt = data.alt;
        this.title = data.title;
        this.text = data.text;
        this.templateSelector = templateSelector;
        this.elementSelector = elementSelector;

    }

    _getTemplate() {
        return document
            .querySelector(this.templateSelector)
            .content.querySelector(this.elementSelector)
            .cloneNode(true);
    }

    _generateCardContent() {
        this._element = this._getTemplate();
        this._element.querySelector(".cards__title").textContent = this.title;
        this._element.querySelector(".cards__description").textContent = this.text;
        const cardImg = this._element.querySelector(".cards__image-img");
        const cardSource = this._element.querySelector(".cards__image-source");
        cardSource.srcset = this.linkWebp;
        cardImg.src = this.linkPng;
        cardImg.alt = this.alt;
        return this._element;
    }

    getCardElement() {
        return this._generateCardContent();

    }
}
