export class TableCell {
    constructor(data) {
        this.title = data.title;
        this.content = data.content;
    }

    _getTemplate() {
        return document
            .querySelector("#table__cell")
            .content.querySelector("li")
            .cloneNode(true);
    }

    _generateTableCellContent() {
        this.element = this._getTemplate();
        this.element.querySelector(".table__heading").textContent = this.title;
        this.element.querySelector(".table__text").textContent = this.content;
        return this.element;
    }

    getTableElement() {
        return this._generateTableCellContent();
    }
}


