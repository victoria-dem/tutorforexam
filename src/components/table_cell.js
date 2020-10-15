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
        this._element = this._getTemplate();
        this._element.querySelector(".table__heading").textContent = this.title;
        this._element.querySelector(".table__text").textContent = this.content;
        return this._element;
    }

    getTableElement() {
        return this._generateTableCellContent();
    }
}

export class TableCellDark extends TableCell {
    getTableElementDark() {
        super._generateTableCellContent();
        this._element.querySelector(".table__heading").classList.add("table__heading_theme_dark");
        this._element.querySelector(".table__text").classList.add("table__text_theme_dark");
        this._element.classList.add("table__cell_theme_dark");
        return this._element;
    }
}
