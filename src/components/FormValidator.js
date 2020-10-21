export class FormValidator {
    constructor(defaultFormConfig, popup) {
        this._formSelector = popup;
        this._inputSelector = defaultFormConfig["inputSelector"];
        this._submitButtonSelector = defaultFormConfig["submitButtonSelector"];
        this._errorMessageSelector = defaultFormConfig["errorMessageSelector"];
        this._inactiveButtonClass = defaultFormConfig["inactiveButtonClass"];
        this._inputErrorClass = defaultFormConfig["inputErrorClass"];
        this._signUpButton = defaultFormConfig["signUpButton"];
        this._logInButton = defaultFormConfig["logInButton"];
    }
    
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    showInputError(inputElement, errorMessage) {
        const errorElement = inputElement.nextElementSibling;
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._inputErrorClass);
    }
    
    _hideInputError(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        errorElement.textContent = "";
        errorElement.classList.remove(this._inputErrorClass);
    }
    
    _hasInvalidInput(inputList) {
        const isValid = inputList.some((inputElement, i) => {
            return !inputElement.validity.valid;
        });
        return isValid
    }
    
    _toggleButtonState(inputList) {
        const buttonElement = this._formSelector.querySelector(
            this._submitButtonSelector
        );
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }
    
    _clearErrorMessages() {
        const errorMessages = this._formSelector.querySelectorAll(
            this._errorMessageSelector
        );
        errorMessages.forEach((node) =>
            node.classList.remove(this._inputErrorClass)
        );
    }
    
    _setEventListeners(inputList) {
        this._signUpButton.addEventListener("click", () => {
            this._clearErrorMessages();
            this._toggleButtonState(inputList);
        });
        this._logInButton.addEventListener("click", () => {
            this._clearErrorMessages();
            this._toggleButtonState(inputList);
        });
    }
    
    enableValidation() {
        const inputList = Array.from(
            this._formSelector.querySelectorAll(this._inputSelector)
        );
        this._toggleButtonState(inputList);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList);
            });
        });
        this._setEventListeners(inputList);
    }
}
