export class Popup {
    constructor(popupSelector) {
        this._popupContainer = popupSelector['popupContainer'];
        this._authHandler = popupSelector['authHandler'];
        this._handleClickClose = this._handleClickClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._authSubmitHandler = this._authSubmitHandler.bind(this)
        // this._openEvt = "";
    }
    
    open() {
        this._popupContainer.classList.remove("popup_fade_out");
        this._popupContainer.classList.add("popup_fade_in");
        window.addEventListener("keyup", this._handleEscClose);
    }
    
    close() {
        this._popupContainer.classList.remove("popup_fade_in");
        this._popupContainer.classList.add("popup_fade_out");
        window.removeEventListener("keyup", this._handleEscClose);
        this._popupContainer.querySelector(".form").reset();
    }
    
    _handleClickClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }
    
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    
    _authSubmitHandler(evt) {
        evt.preventDefault();
        const email = this._popupContainer.querySelector(".form__input-first-field").value
        const password = this._popupContainer.querySelector(".form__input-second-field").value
        this._authHandler(email, password)
    }
    
    setEventListeners() {
        this._popupContainer.addEventListener("mousedown", this._handleClickClose);
        this._popupContainer
            .querySelector(".popup__close")
            .addEventListener("mousedown", this._handleClickClose);
        this._popupContainer
            .querySelector(".form")
            .addEventListener("submit", this._authSubmitHandler);
    }
}
