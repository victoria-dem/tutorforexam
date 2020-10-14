export class Popup {
    constructor(popupSelector) {
        this._popupContainer = popupSelector['popupContainer'];
        this._handleClickClose = this._handleClickClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        // this._openEvt = "";
    }
    
    open() {
        // console.log(this._popupsContainer)
        // console.log("open-card", currentCardId, cardToDelete);
        this._popupContainer.classList.remove("popup_fade_out");
        this._popupContainer.classList.add("popup_fade_in");
        window.addEventListener("keyup", this._handleEscClose);
        // this._cardToDelete = cardToDelete;
    }
    
    close() {
        this._popupContainer.classList.remove("popup_fade_in");
        this._popupContainer.classList.add("popup_fade_out");
        window.removeEventListener("keyup", this._handleEscClose);
    }
    
    _handleClickClose(evt) {
        console.log('_handleClickClose');
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    
    setEventListeners() {
        console.log(this._popupContainer);
        this._popupContainer.addEventListener("mousedown", this._handleClickClose);
        this._popupContainer
            .querySelector(".popup__close")
            .addEventListener("mousedown", this._handleClickClose);
    }
}
