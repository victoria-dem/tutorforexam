// import "./index.css";

import {
    startAnalogiesButton,
    startMathButton,
    submitAnswer,
    form,
    nextQuestion,
    quizResultElement,
    quizResultCheckmarkElement,
    quizSolutionElement
} from '../utils/constants.js';
import {math} from "../utils/math.js"
import {resultMessages, analogies} from "../utils/analogies.js"
import {Api} from "../components/Api.js"

let correctAnswer;
let quizSolution;

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
    } else {
        quizResultCheckmarkElement.classList.add('quiz__img_answer_wrong');
        quizResultElement.innerHTML = resultMessages['failed'][Math.floor(Math.random() * resultMessages['failed'].length)]
    }
    form.elements['answer'].forEach(answerElement => {
        answerElement.disabled = true
    })
    displayQuizResult()
    disableSubmitAnswerBtn()
    enableNextQuestionBtn()
}

function getNextQuestion() {
    const currentQuestionType = document.querySelector('.quizzes__start_active').innerHTML
    if (currentQuestionType === 'Math') {
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

const api = new Api({
    baseUrl: "http://numbersapi.com",
});

function renderMathInfo(fact, numberToDisplay, isRandomNumber) {
    if ((fact.text.length > 150 && isRandomNumber) || (fact.text.length <70 && isRandomNumber)){
        getRandomNumberInfo(Math.floor(Math.random()*100), numberToDisplay, true)
    } else if ((fact.text.length > 150 && !isRandomNumber) || (fact.text.length <70 && !isRandomNumber)) {
        getRandomFactInfo(Math.floor(Math.random()*200), numberToDisplay, false)
    }
    {
        const sentence = fact.text.split(' ');
        const firstWord = sentence[0];
        const restSentense = sentence.slice(1).join(' ');
        document.querySelector(`.number-fact${numberToDisplay}`).innerHTML = `<span class="first-word">${firstWord.toString()}</span> ${restSentense}`
    }
}

function getRandomNumberInfo(randomNumber, numberToDisplay) {
    api
        .getRandomNumberInfo(randomNumber)
        .then((fact) => renderMathInfo(fact, numberToDisplay, true))
        .catch((err) => console.log(`Ошибка: ${err}`));
}

function getRandomFactInfo(randomNumber, numberToDisplay) {
    api
        .getRandomFactInfo(randomNumber)
        .then((fact) => renderMathInfo(fact, numberToDisplay, false))
        .catch((err) => console.log(`Ошибка: ${err}`));
}

getRandomNumberInfo(Math.floor(Math.random()*100), '__first')
getRandomNumberInfo(Math.floor(Math.random()*500), '__second')
getRandomNumberInfo(Math.floor(Math.random()*1000), '__third')

getRandomFactInfo(Math.floor(Math.random()*200), '__forth')
getRandomFactInfo(Math.floor(Math.random()*200), '__fifth')
getRandomFactInfo(Math.floor(Math.random()*200), '__sixth')

startMath()

startAnalogiesButton.addEventListener('click', startAnalogies)
startMathButton.addEventListener('click', startMath)
submitAnswer.addEventListener('click', submitHandler)
nextQuestion.addEventListener('click', getNextQuestion)
