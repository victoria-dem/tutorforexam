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
import {factsinfo} from "../utils/factsinfo.js";
import {math} from "../utils/math.js"
import {resultMessages, analogies} from "../utils/analogies.js"
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
import {motivationsinfo} from "../utils/motivationsinfo.js";
import {descriptionMainText} from "../utils/descriptionmaintext.js";
import {financeMainText} from "../utils/financemaintext.js";
import {glanceCards} from "../utils/glancecards.js";

let correctAnswer;
let userEmail;
let quizSolution;
let userId = '';
let currentQuestionType;

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
        if (userId !== '') calculateScore(currentQuestionType, 1, 1)
        
    } else {
        quizResultCheckmarkElement.classList.add('quiz__img_answer_wrong');
        quizResultElement.innerHTML = resultMessages['failed'][Math.floor(Math.random() * resultMessages['failed'].length)]
        if (userId !== '') calculateScore(currentQuestionType, 1, 0)
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

//FIREBASE SETUP
firebase.initializeApp
(firebaseConfig)
const auth = firebase.auth();
const db = firebase.firestore();

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

function renderLogOutUser() {
    loggedInElements.forEach(element => element.classList.add('auth__item_hide'))
    loggedOutElements.forEach(element => element.classList.remove('auth__item_hide'))
    logInButton.innerHTML = 'login'
    signUpButton.innerHTML = 'signup'
    userId = ''
}

function renderLogInUser(user) {
    loggedInElements.forEach(element => element.classList.remove('auth__item_hide'))
    loggedOutElements.forEach(element => element.classList.add('auth__item_hide'))
    logOutButton.innerHTML = 'logout'
    accountButton.innerHTML = 'account'
    userEmail = user.email
    isUserNew(user)
}


function calculateScore(currentQuestionType, incrementTotalAnswer, incrementCorrectAnswer) {
    db.collection("score").doc(userId)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const allSubjectsTotal = doc.data().all_subjects.total + incrementTotalAnswer
                const allSubjectsCorrect = doc.data().all_subjects.correct + incrementCorrectAnswer
                if (currentQuestionType === 'math') {
                    const mathTotal = doc.data().math.total + incrementTotalAnswer
                    const mathCorrect = doc.data().math.correct + incrementCorrectAnswer
                    updateMathScore(mathTotal, mathCorrect, allSubjectsTotal, allSubjectsCorrect)
                } else {
                    const analogiesTotal = doc.data().analogies.total + incrementTotalAnswer
                    const analogiesCorrect = doc.data().analogies.correct + incrementCorrectAnswer
                    updateAnalogiesScore(analogiesTotal, analogiesCorrect, allSubjectsTotal, allSubjectsCorrect)
                }
            } else {
                console.log("No such document!");
            }
        }).catch(error => console.log("Error getting document:", error));
}

function updateMathScore(mathTotal, mathCorrect, allSubjectsTotal, allSubjectsCorrect) {
    db.collection("score").doc(userId).update({
            math: {
                total: mathTotal,
                correct: mathCorrect
            },
            all_subjects: {
                total: allSubjectsTotal,
                correct: allSubjectsCorrect
            }
        })
        .then(() => console.log("Document successfully updated with math score"))
        .catch(error => console.error("Error updating document: ", error));
}

function updateAnalogiesScore(analogiesTotal, analogiesCorrect, allSubjectsTotal, allSubjectsCorrect) {
    db.collection("score").doc(userId).update({
            analogies: {
                total: analogiesTotal,
                correct: analogiesCorrect
            },
            all_subjects: {
                total: allSubjectsTotal,
                correct: allSubjectsCorrect
            }
        })
        .then(() => console.log("Document successfully updated with analogies score"))
        .catch(error => console.error("Error updating document: ", error));
}

function isUserNew(user) {
    userId = user.uid
    db.collection("score").doc(userId)
        .get()
        .then((doc) => {
            if (!doc.exists) createScoreDocument(userId)
        })
        .catch(error => console.log("Error getting document:", error));
}

function createScoreDocument(userId) {
    db.collection("score").doc(userId).set({
            math: {
                total: 0,
                correct: 0
            },
            analogies: {
                total: 0,
                correct: 0
            },
            all_subjects: {
                total: 0,
                correct: 0
            }
        })
        .then(() => console.log(`Document successfully written`))
        .catch((error) => console.error("Error writing document: ", error));
}

auth.onAuthStateChanged(user => {
    checkMenuElement()
})

// Hamburger menu
function checkMenuElement() {
    const firstPromise = new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            resolve(user)
            reject('error')
        })
    }).catch((reason => console.error(reason)))
    
    const secondPromise = new Promise((resolve, reject) => {
        const hamburgerDisplayStyle = window.getComputedStyle(hamburgerMenuElement).display
        if (hamburgerDisplayStyle !== 'none') {
            resolve(true)
        } else if (hamburgerDisplayStyle === 'none') {
            resolve(false)
        } else {
            reject('error with hamburgerDisplayStyle')
        }
    }).catch((reason => console.error(reason)))
    
    const promises = [firstPromise, secondPromise]
    Promise.all(promises)
        .then((results) => {
            const user = results[0];
            const isHamburgerMenuVisible = results[1]
            renderMenu(user, isHamburgerMenuVisible)
        });
}

function renderMenu(user, isHamburgerMenuVisible) {
    // TODO promise
    // strictly - first
    if (isHamburgerMenuVisible === true) {
        hamburgerMenuElement.classList.remove('auth__hamburger_state_opened')
        renderClosedHamburgerMenu(userId)
    } else {
        loggedOutElements.forEach(element => element.classList.remove('auth__hamburger-closed'))
        loggedOutElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
        loggedInElements.forEach(element => element.classList.remove('auth__hamburger-closed'))
        loggedInElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
    }
    // strictly - second
    if (user === null) {
        renderLogOutUser()
    } else {
        renderLogInUser(user)
    }
}

function renderClosedHamburgerMenu(userId) {
    if (userId === '') {
        loggedOutElements.forEach(element => element.classList.add('auth__hamburger-closed'))
        loggedOutElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
    } else {
        loggedInElements.forEach(element => element.classList.add('auth__hamburger-closed'))
        loggedInElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
    }
}

function renderOpenedHamburgerMenu(userId) {
    if (userId === '') {
        loggedOutElements.forEach(element => element.classList.remove('auth__hamburger-closed'))
        loggedOutElements.forEach(element => element.classList.add('auth__hamburger-opened'))
    } else {
        loggedInElements.forEach(element => element.classList.remove('auth__hamburger-closed'))
        loggedInElements.forEach(element => element.classList.add('auth__hamburger-opened'))
    }
}

function toggleHamburgerMenu() {
    if (hamburgerMenuElement.classList.contains("auth__hamburger_state_opened")) {
        renderOpenedHamburgerMenu(userId)
    } else {
        renderClosedHamburgerMenu(userId)
    }
}

const mutationObserver = new MutationObserver(toggleHamburgerMenu)
mutationObserver.observe(hamburgerMenuElement, mutationConfig)

window.onresize = function () {
    checkMenuElement()
};

checkMenuElement()

// USER INFO
const accountPopup = new PopupAccount({
    popupSelector: accountPopupElement,
    resetScore: resetScore,
    getUserScore: getUserScore
})

accountPopup.setEventListeners()

function accountPopupHandler() {
    accountPopup.open()
}

function resetScore() {
    updateMathScore(0, 0, 0, 0)
    updateAnalogiesScore(0, 0, 0, 0)
}

function getUserScore() {
    db.collection("score").doc(userId)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const allSubjectsTotal = doc.data().all_subjects.total
                const allSubjectsCorrect = doc.data().all_subjects.correct
                const analogiesTotal = doc.data().analogies.total
                const analogiesCorrect = doc.data().analogies.correct
                const mathTotal = doc.data().math.total
                const mathCorrect = doc.data().math.correct
                const score = {
                    allSubjectsTotal,
                    allSubjectsCorrect,
                    analogiesTotal,
                    analogiesCorrect,
                    mathTotal,
                    mathCorrect
                }
                accountPopup.renderScoreInfo(score, userEmail)
            } else {
                console.log("No such document!");
            }
        }).catch(error => console.log("Error getting document:", error));
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
