import { Popup } from "./Popup.js";

export class PopupAccount extends Popup {
    constructor({popupSelector, resetScore}) {
        super(popupSelector);
        this._resetScore = resetScore;
    }
    
    // setEventListeners() {
    //     super.setEventListeners();
    //     this._popupContainer
    //         .querySelector(".form__close-button")
    //         .addEventListener("mousedown", this._handleClickClose);
    // }
}