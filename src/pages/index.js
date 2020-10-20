// import "./index.css";

import {
    startAnalogiesButton,
    startMathButton,
    submitAnswer,
    form,
    nextQuestion,
    quizResultElement,
    quizResultCheckmarkElement,
    quizSolutionElement,
    signUpButton,
    logInButton,
    logOutButton,
    accountButton,
    signUpPopupElement,
    defaultFormConfig,
    logInPopupElement,
    firebaseConfig,
    loggedInElements,
    loggedOutElements,
    accountPopupElement,
    hamburgerMenuElement,
    mutationConfig,
    tableFacts,
    tableMotivations,
    glanceCardsElement
} from '../utils/constants.js';
import {glanceCards} from "../utils/glancecards_.js";
import {factsinfo} from "../utils/factsinfo.js";
import {math} from "../utils/math.js"
import {resultMessages, analogies} from "../utils/analogies.js"
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

let quizSolution;
let correctAnswer;
let currentQuestionType;
let userEmail='';
let userId = '';

//FIREBASE SETUP
firebase.initializeApp
(firebaseConfig)
const auth = firebase.auth();
const db = firebase.firestore();

//SCORE
const score = new Score(db, showScoreAndEmail)



//Quiz
const quiz = new Quiz()




function clearPreviousAnswers() {
    form.querySelectorAll('.quiz__answer-item').forEach(answer => answer.remove())
    document.querySelectorAll('.quiz__hint').forEach(hintContent => hintContent.remove())
    quizSolutionElement.innerHTML = ''
    quizResultElement.innerHTML = ''
    disableSubmitAnswerBtn()
    disableNextQuestionBtn()
    clearQuizResult()
}

function disableNextQuestionBtn() {
    nextQuestion.classList.remove('quiz__button_state_active')
    nextQuestion.classList.add('quiz__button_state_disable')
}

function enableNextQuestionBtn() {
    nextQuestion.classList.add('quiz__button_state_active')
    nextQuestion.classList.remove('quiz__button_state_disable')
}

function disableSubmitAnswerBtn() {
    submitAnswer.classList.remove('quiz__button_state_active')
    submitAnswer.classList.add('quiz__button_state_disable')
}

function enableSubmitAnswerBtn() {
    submitAnswer.classList.add('quiz__button_state_active')
    submitAnswer.classList.remove('quiz__button_state_disable')
}

function clearQuizResult() {
    quizResultElement.classList.remove('quiz__result_active');
    quizSolutionElement.classList.remove('quiz__solution_active');
    quizResultCheckmarkElement.classList.remove('quiz__img_answer_right');
    quizResultCheckmarkElement.classList.remove('quiz__img_answer_wrong');
    quizResultCheckmarkElement.classList.remove('quiz__img_active');
}

function toggleHint(evt) {
    evt.target.parentNode.querySelector('.quiz__hint-content').classList.toggle('quiz__hint-content_hidden')
}

function renderHints(quiz) {
    for (let key in quiz.hints) {
        if (quiz.hints.hasOwnProperty(key)) {
            const hintElementTemplate = document.querySelector('#quiz__hint').content.cloneNode(true)
            const hintElement = hintElementTemplate.querySelector('.quiz__hint')
            const hintElementContent = hintElementTemplate.querySelector('.quiz__hint-content')
            const hintElementTitle = hintElementTemplate.querySelector('.quiz__hint-title')
            hintElementContent.innerHTML = quiz.hints[key]
            hintElementTitle.innerHTML = `hint #${+key + 1}`
            hintElementTitle.addEventListener('click', toggleHint)
            document.querySelector('.quiz__hints').append(hintElement)
        }
    }
}

function renderQuiz(quiz) {
    clearPreviousAnswers()
    form.querySelector('.quiz__question').innerHTML = quiz.question
    correctAnswer = quiz.correctAnswer
    quizSolution = quiz.solution
    renderAnswers(quiz)
    renderHints(quiz)
}

function displayQuizResult() {
    quizResultElement.classList.add('quiz__result_active')
    quizSolutionElement.classList.add('quiz__solution_active')
    quizResultCheckmarkElement.classList.add('quiz__img_active')
    quizSolutionElement.innerHTML = quizSolution
}

function renderAnswers(quiz) {
    for (let key in quiz.answers) {
        if (quiz.answers.hasOwnProperty(key)) {
            const answerElement = document.querySelector('#quiz__answer').content.cloneNode(true)
            const answerLabel = answerElement.querySelector('.quiz__answer-label')
            const answerInput = answerElement.querySelector('.quiz__answer-input')
            answerLabel.innerHTML = quiz.answers[key]
            answerLabel.htmlFor = key
            answerInput.id = key
            answerInput.addEventListener('click', enableSubmitAnswerBtn)
            document.querySelector('.quiz__answers').append(answerElement)
        }
    }
}

function submitHandler(evt) {
    evt.preventDefault()
    if (form.elements['answer'][correctAnswer].checked) {
        quizResultCheckmarkElement.classList.add('quiz__img_answer_right');
        quizResultElement.innerHTML = resultMessages['passed'][Math.floor(Math.random() * resultMessages['passed'].length)]
        if (userId !== '') score.calculateScore(userId, currentQuestionType, 1, 1)
        
    } else {
        quizResultCheckmarkElement.classList.add('quiz__img_answer_wrong');
        quizResultElement.innerHTML = resultMessages['failed'][Math.floor(Math.random() * resultMessages['failed'].length)]
        if (userId !== '') score.calculateScore(userId, currentQuestionType, 1, 0)
    }
    form.elements['answer'].forEach(answerElement => {
        answerElement.disabled = true
    })
    displayQuizResult()
    disableSubmitAnswerBtn()
    enableNextQuestionBtn()
}

function getNextQuestion() {
    currentQuestionType = document.querySelector('.quizzes__start_active').innerHTML.toLowerCase()
    if (currentQuestionType === 'math') {
        const questionNum = Math.floor(Math.random() * math.length)
        renderQuiz(math[questionNum])
    } else {
        const questionNum = Math.floor(Math.random() * analogies.length)
        renderQuiz(analogies[questionNum])
    }
}

function startMath() {
    startMathButton.classList.add('quizzes__start_active')
    startAnalogiesButton.classList.remove('quizzes__start_active')
    getNextQuestion()
}

function startAnalogies() {
    startMathButton.classList.remove('quizzes__start_active')
    startAnalogiesButton.classList.add('quizzes__start_active')
    getNextQuestion()
}

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
startMath()

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
startAnalogiesButton.addEventListener('click', startAnalogies)
startMathButton.addEventListener('click', startMath)
submitAnswer.addEventListener('click', submitHandler)
nextQuestion.addEventListener('click', getNextQuestion)
signUpButton.addEventListener('click', signUpPopupHandler)
logOutButton.addEventListener('click', logOutHandler)
logInButton.addEventListener('click', logInPopupHandler)
accountButton.addEventListener('click', accountPopupHandler)
