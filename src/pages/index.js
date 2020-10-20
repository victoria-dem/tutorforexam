import "./index.css";

import {
    signUpButton,
    logInButton,
    logOutButton,
    accountButton,
    signUpPopupElement,
    defaultFormConfig,
    logInPopupElement,
    firebaseConfig,
    accountPopupElement,
    hamburgerMenuElement,
    mutationConfig,
    tableFacts,
    tableMotivations,
    glanceCardsElement
} from '../utils/constants.js';
import {glanceCards} from "../utils/glancecards.js";
import {factsinfo} from "../utils/factsinfo.js";
import {motivationsinfo} from "../utils/motivationsinfo.js";
import {descriptionMainText} from "../utils/descriptionmaintext.js";
import {financeMainText} from "../utils/financemaintext.js";
import {PopupAccount} from "../components/PopupAccount.js";
import {PopupAuth} from "../components/PopupAuth.js";
import {FormValidator} from "../components/FormValidator.js";
import {SignUpFormValidator} from "../components/SignUpFormValidator.js";
import {TableCell} from "../components/TableCell.js";
import {TableCellDark} from "../components/TableCellDark.js";
import {Card} from "../components/Card.js";
import {TwoColumnsMainTextParagraph} from "../components/TwoColumnsMainTextParagraph.js";
import {TwoColumnsMainTextParagraphWithSpan} from "../components/TwoColumnsMainTextParagraphWithSpan.js";
import {TwoColumnsMainTextList} from "../components/TwoColumnsMainTextList.js";
import {Menu} from "../components/Menu.js";
import {Score} from "../components/Score.js";
import {Quiz} from "../components/Quiz.js";

let userEmail='';
let userId = '';

//FIREBASE INIT
firebase.initializeApp
(firebaseConfig)
const auth = firebase.auth();
const db = firebase.firestore();

//Quiz
const quiz = new Quiz(calculateScore)
quiz.setEventListeners()

function calculateScore(currentQuestionType, incrementTotalAnswers, incrementCorrectAnswers) {
    if (userId !== '') score.calculateScore(userId, currentQuestionType, incrementTotalAnswers, incrementCorrectAnswers)
}

//SCORE
const score = new Score(db, showScoreAndEmail)

//SIGNUP
const signUpPopup = new PopupAuth({
    popupSelector: signUpPopupElement,
    authHandler: signUpNewUser
})

signUpPopup.setEventListeners()

function signUpPopupHandler() {
    signUpPopup.open()
}

function signUpNewUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(credentials => signUpPopup.close())
        .catch(err => printErrorMessage(signUpFormValidator, "#first-field-place", err))
}

//LOGOUT
function logOutHandler(evt) {
    evt.preventDefault()
    auth.signOut()
        .then(() => console.log('user log out'))
        .catch(err => console.log(err));
}

//LOG IN
const logInPopup = new PopupAuth({
    popupSelector: logInPopupElement,
    authHandler: logInUser
})

logInPopup.setEventListeners()

function logInPopupHandler() {
    logInPopup.open()
}

function logInUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(credentials => logInPopup.close())
        .catch(err => printErrorMessage(logInFormValidator, "#first-field-log-in", err))
}

function printErrorMessage(formValidator, selector, err) {
    const inputElement = document.querySelector(selector)
    const errorMessage = err.message
    formValidator.showInputError(inputElement, errorMessage)
}

function isUserNew(user) {
    userId = user.uid
    db.collection("score").doc(userId)
        .get()
        .then((doc) => {
            if (!doc.exists) score.createScoreDocument(userId)
        })
        .catch(error => console.log("Error getting document:", error));
}

// MENU
const menu = new Menu(auth, isUserNew);

auth.onAuthStateChanged(user => {
    if (user === null) {
        userId = ''
    } else {
        userId = user.uid
        userEmail = user.email
    }
    menu.checkMenuElement()
})

const mutationObserver = new MutationObserver(menu.toggleHamburgerMenuState)
mutationObserver.observe(hamburgerMenuElement, mutationConfig)

window.onresize = function () {
    menu.checkMenuElement()
};

menu.checkMenuElement()

// USER INFO
const accountPopup = new PopupAccount({
    popupSelector: accountPopupElement,
    resetScore: resetScore,
    getUserInfo: getUserInfo
})

accountPopup.setEventListeners()

function accountPopupHandler() {
    accountPopup.open()
}

function resetScore() {
    score.updateMathScore(userId,0, 0, 0, 0)
    score.updateAnalogiesScore(userId,0, 0, 0, 0)
}

function getUserInfo() {
    score.getUserInfoAndEmail(userId)
}

function showScoreAndEmail(score) {
    accountPopup.renderScoreInfo(score, userEmail)
}

//VALIDATION
const signUpFormValidator = new SignUpFormValidator(
    defaultFormConfig,
    signUpPopupElement
);
signUpFormValidator.enableValidation();

const logInFormValidator = new FormValidator(
    defaultFormConfig,
    logInPopupElement
);
logInFormValidator.enableValidation();

//START
quiz.startMath()

//RENDERING STATIC CONTENT
const renderFacts = (item) => {
    const tableCell = new TableCell(item);
    tableFacts.append(tableCell.getTableElement());
};

const renderMotivations = (item) => {
    const tableCellDark = new TableCellDark(item);
    tableMotivations.append(tableCellDark.getTableElementDark());
};

const renderMainText = (item, sectionClass) => {
    let blockElement = '';
    const itemKey = Object.keys(item);
    switch (itemKey[0]) {
        case 'paragraph':
            blockElement = new TwoColumnsMainTextParagraph(item);
            break;
        case 'list' :
            blockElement = new TwoColumnsMainTextList(item);
            break;
        case 'paragraphWithSpan':
            blockElement = new TwoColumnsMainTextParagraphWithSpan(item);
            break;
    }
    document.querySelector(sectionClass).append(blockElement.getTwoColumnsMainText());
};

const renderCard = (item, templateSelector, elementSelector) => {
    const newCard = new Card(item, templateSelector, elementSelector);
    glanceCardsElement.append(newCard.getCardElement());
}

factsinfo.forEach(renderFacts);
motivationsinfo.forEach(renderMotivations);
descriptionMainText.forEach(function (item) {
    renderMainText(item, '#description')
});
financeMainText.forEach(function (item) {
    renderMainText(item, '#finance')
});
glanceCards.forEach(function (item) {
    renderCard(item, '#cards__item', '.cards__item');
});

//LISTENERS
signUpButton.addEventListener('click', signUpPopupHandler)
logOutButton.addEventListener('click', logOutHandler)
logInButton.addEventListener('click', logInPopupHandler)
accountButton.addEventListener('click', accountPopupHandler)
