export const startAnalogiesButton = document.querySelector('.quizzes__start-analogies');
export const startMathButton = document.querySelector('.quizzes__start-math');
export const submitAnswer = document.querySelector('.quiz__submit-answer');
export const form = document.querySelector('.quiz');
export const fullQuiz = document.querySelector('.quizzes');
export const nextQuestion = document.querySelector('.quiz__next-question');
export const quizResultElement = fullQuiz.querySelector('.quiz__result');
export const quizResultCheckmarkElement = fullQuiz.querySelector('.quiz__img');
export const quizSolutionElement = fullQuiz.querySelector('.quiz__solution');

export const signUpButton = document.querySelector('.auth__item-sign-up')
export const logInButton = document.querySelector('.auth__item-log-in')
export const logOutButton = document.querySelector('.auth__item-log-out')
export const accountButton = document.querySelector('.auth__item-account')
export const signUpPopupElement = document.querySelector('.popup-form-sign-up')
export const accountPopupElement = document.querySelector('.popup-form-account')

export const logInPopupElement = document.querySelector('.popup-form-log-in')
export const loggedInElements = document.querySelectorAll('.auth__item-logged-in')
export const loggedOutElements = document.querySelectorAll('.auth__item-logged-out')


export const defaultFormConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    errorMessageSelector: ".form__field",
    inactiveButtonClass: "form__submit-button_disabled",
    inputErrorClass: "form__field_type_error",
    signUpButton: signUpButton,
    logInButton: logInButton,
};

export const firebaseConfig = {
    apiKey: "AIzaSyBC6a-LxWSU80VBsSafj6PE0KeTAYnJmY8",
    authDomain: "tutor4exam-7d689.firebaseapp.com",
    databaseURL: "https://tutor4exam-7d689.firebaseio.com",
    projectId: "tutor4exam-7d689",
    storageBucket: "tutor4exam-7d689.appspot.com",
    messagingSenderId: "239029785663",
    appId: "1:239029785663:web:9d52ab164ae1465a31948a"
};