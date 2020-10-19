import {TableCell} from "./TableCell.js";

export class TableCellDark extends TableCell {
    getTableElementDark() {
        super._generateTableCellContent();
        this.element.querySelector(".table__heading").classList.add("table__heading_theme_dark");
        this.element.querySelector(".table__text").classList.add("table__text_theme_dark");
        this.element.classList.add("table__cell_theme_dark");
        return this.element;
    }
}
