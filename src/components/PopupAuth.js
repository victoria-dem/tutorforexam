import { Popup } from "./Popup.js";

export class PopupAuth extends Popup {
    constructor({ popupSelector, authHandler }) {
        super(popupSelector);
        this._authHandler = authHandler;
        this._authSubmitHandler = this._authSubmitHandler.bind(this)
    }
    
    _authSubmitHandler(evt) {
        evt.preventDefault();
        const email = this._popupContainer.querySelector(".form__input-first-field").value
        const password = this._popupContainer.querySelector(".form__input-second-field").value
        this._authHandler(email, password)
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupContainer
            .querySelector(".form")
            .addEventListener("submit", this._authSubmitHandler);
    }
}