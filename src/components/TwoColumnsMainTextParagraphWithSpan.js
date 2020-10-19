import {TwoColumnsMainTextParagraph} from "./TwoColumnsMainTextParagraph.js";

export class  TwoColumnsMainTextParagraphWithSpan extends TwoColumnsMainTextParagraph{
    constructor (item) {
        super(item);
        this.paragraph = item.paragraphWithSpan[1].paragraph;
        this.spanText =  item.paragraphWithSpan[0].spantext;
}
    _generateElementWithContent() {
        super ._generateElementWithContent();
        const spanElement = document.createElement("span");
        spanElement.classList.add("two-columns__span-accent")
        spanElement.textContent = this.spanText;
        this.newElement.prepend(spanElement);
        return this.newElement;
    }

    getTwoColumnsMainText() {
        return this._generateElementWithContent();
    }
}
