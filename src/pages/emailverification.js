import "./index.css";

const firebaseConfig = {
    apiKey: "AIzaSyBC6a-LxWSU80VBsSafj6PE0KeTAYnJmY8",
    authDomain: "tutor4exam-7d689.firebaseapp.com",
    databaseURL: "https://tutor4exam-7d689.firebaseio.com",
    projectId: "tutor4exam-7d689",
    storageBucket: "tutor4exam-7d689.appspot.com",
    messagingSenderId: "239029785663",
    appId: "1:239029785663:web:9d52ab164ae1465a31948a"
};

firebase.initializeApp
(firebaseConfig)
const auth = firebase.auth();

const urlParam = window.location.href
const startPosition = urlParam.indexOf('Code=')
const endPosition = urlParam.indexOf('&', startPosition)
const actionCode = urlParam.slice(startPosition+5, endPosition)

document.querySelector('.header__title').textContent = 'Your email has been successfully verified'


function handleVerifyEmail(auth, actionCode) {
    auth.applyActionCode(actionCode)
        .then(resp => document.querySelector('.header__title').textContent = 'Your email has been successfully verified')
        .catch(error => document.querySelector('.header__title').textContent = error.message)
}

handleVerifyEmail(auth, actionCode)