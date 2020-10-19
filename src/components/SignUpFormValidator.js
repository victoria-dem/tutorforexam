import {FormValidator} from "./FormValidator.js";

export class SignUpFormValidator extends FormValidator {
    constructor(defaultFormConfig, popup) {
        super(defaultFormConfig, popup);
    }
    
    _hasInvalidInput(inputList) {
        const isValid = inputList.some((inputElement, i) => {
            return !inputElement.validity.valid;
        });
        if (isValid) {
            return true
        } else if (!isValid && ((inputList[1].value === inputList[2].value))) {
            return false
        } else {
            const inputElement = document.querySelector("#third-field-place")
            const errorMessage = 'Passwords are not the same'
            this.showInputError(inputElement, errorMessage)
            return true
        }
    }
}