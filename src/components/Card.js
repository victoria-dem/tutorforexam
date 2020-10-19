export class Card {
    constructor(data,templateSelector,elementSelector) {
        this.link = data.link;
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
        const cardImg = this._element.querySelector(".cards__image");
        cardImg.src = this.link;
        cardImg.alt = this.alt;
        return this._element;
    }

    getCardElement() {
        return this._generateCardContent();

    }
}
