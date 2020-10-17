import { Popup } from "./Popup.js";

export class PopupAuth extends Popup {
    constructor() {
        super(popupSelector);
    }
    
    // setEventListeners() {
    //     super.setEventListeners();
    //     this._popupContainer
    //         .querySelector(".form__close-button")
    //         .addEventListener("mousedown", this._handleClickClose);
    // }
}