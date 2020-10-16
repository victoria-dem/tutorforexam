export const startAnalogiesButton = document.querySelector('.quizzes__start-analogies');
export const startMathButton = document.querySelector('.quizzes__start-math');
export const submitAnswer = document.querySelector('.quiz__submit-answer');
export const form = document.querySelector('.quiz');
export const fullQuiz = document.querySelector('.quizzes');
export const nextQuestion = document.querySelector('.quiz__next-question');
export const quizResultElement = fullQuiz.querySelector('.quiz__result');
export const quizResultCheckmarkElement = fullQuiz.querySelector('.quiz__img');
export const quizSolutionElement = fullQuiz.querySelector('.quiz__solution');

export const signUpButton = document.querySelector('.navigation__item-sign-up')
export const logInButton = document.querySelector('.navigation__item-log-in')
export const logOutButton = document.querySelector('.navigation__item-log-out')
export const userNameButton = document.querySelector('.navigation__item-user-name')
export const signUpPopupElement = document.querySelector('.popup-form-sign-up')
export const logInPopupElement = document.querySelector('.popup-form-log-in')

export const defaultFormConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    errorMessageSelector: ".form__field",
    inactiveButtonClass: "form__submit-button_disabled",
    inputErrorClass: "form__field_type_error",
    signUpButton: signUpButton,
    logInButton: logInButton,
};