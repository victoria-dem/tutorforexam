import { Popup } from "./Popup.js";

export class PopupAccount extends Popup {
    constructor({popupSelector, resetScore, getUserScore}) {
        super(popupSelector);
        this._resetScore = resetScore;
        this._resetScore = this._resetScore.bind(this)
        this._getUserScore = getUserScore;
        this._getUserScore = this._getUserScore.bind(this)
        this._resetScoreHandler = this._resetScoreHandler.bind(this)
    }
    
    open() {
        super.open();
        this._getUserScore()
    }
    
    renderScoreInfo(score, email) {
        this._popupContainer.querySelector(".form__text-email").innerText = `Username: ${email}`;
        this._popupContainer.querySelector(".form__text-all_subjects").innerText =
            `Total answers: ${score.allSubjectsCorrect} correct out of ${score.allSubjectsTotal}`;
        this._popupContainer.querySelector(".form__text-analogies").innerText =
            `Analogies: ${score.analogiesCorrect} correct out of ${score.analogiesTotal}`
        this._popupContainer.querySelector(".form__text-math").innerText =
        `Math: ${score.mathCorrect} correct out of ${score.mathTotal}`
    }
    
    _resetScoreHandler(evt) {
        evt.preventDefault();
        this._getUserScore()
        this._resetScore()
        this._getUserScore()
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupContainer
            .querySelector(".form__close-button")
            .addEventListener("mousedown", this._handleClickClose);
        this._popupContainer
            .querySelector(".form")
            .addEventListener("submit", this._resetScoreHandler);
    }
}