import {
    form, nextQuestion, quizResultCheckmarkElement,
    quizResultElement,
    quizSolutionElement,
    startAnalogiesButton,
    startMathButton, submitAnswer
} from "../utils/constants.js";
import {math} from "../utils/math.js";
import {analogies, resultMessages} from "../utils/analogies.js";

export class Quiz {
    constructor(calculateScore) {
        this._calculateScore=calculateScore
        this._submitAnswerHandler=this._submitAnswerHandler.bind(this)
        this._getNextQuestion=this._getNextQuestion.bind(this)
        this.startAnalogies=this.startAnalogies.bind(this)
        this.startMath=this.startMath.bind(this)
        this._currentQuestionType = ''
        this._correctAnswer = ''
        this._quizSolution = ''
    }
    
    startMath() {
        startMathButton.classList.add('quizzes__start_active')
        startAnalogiesButton.classList.remove('quizzes__start_active')
        this._getNextQuestion()
    }
    
    startAnalogies() {
        startMathButton.classList.remove('quizzes__start_active')
        startAnalogiesButton.classList.add('quizzes__start_active')
        this._getNextQuestion()
    }
    
    _getNextQuestion() {
        this._currentQuestionType = document.querySelector('.quizzes__start_active').innerHTML.toLowerCase()
        if (this._currentQuestionType === 'math') {
            const questionNum = Math.floor(Math.random() * math.length)
            this._renderQuiz(math[questionNum])
        } else {
            const questionNum = Math.floor(Math.random() * analogies.length)
            this._renderQuiz(analogies[questionNum])
        }
    }
    
    _renderQuiz(quiz) {
        this._clearPreviousAnswers()
        form.querySelector('.quiz__question').innerHTML = quiz.question
        this._correctAnswer = quiz.correctAnswer
        this._quizSolution = quiz.solution
        this._renderAnswers(quiz)
        this._renderHints(quiz)
    }
    
    _clearPreviousAnswers() {
        form.querySelectorAll('.quiz__answer-item').forEach(answer => answer.remove())
        document.querySelectorAll('.quiz__hint').forEach(hintContent => hintContent.remove())
        quizSolutionElement.innerHTML = ''
        quizResultElement.innerHTML = ''
        this._disableSubmitAnswerBtn()
        this._disableNextQuestionBtn()
        this._clearQuizResult()
    }
    
    _renderAnswers(quiz) {
        for (let key in quiz.answers) {
            if (quiz.answers.hasOwnProperty(key)) {
                const answerElement = document.querySelector('#quiz__answer').content.cloneNode(true)
                const answerLabel = answerElement.querySelector('.quiz__answer-label')
                const answerInput = answerElement.querySelector('.quiz__answer-input')
                answerLabel.innerHTML = quiz.answers[key]
                answerLabel.htmlFor = key
                answerInput.id = key
                answerInput.addEventListener('click', this._enableSubmitAnswerBtn)
                document.querySelector('.quiz__answers').append(answerElement)
            }
        }
    }
    
    _renderHints(quiz) {
        for (let key in quiz.hints) {
            if (quiz.hints.hasOwnProperty(key)) {
                const hintElementTemplate = document.querySelector('#quiz__hint').content.cloneNode(true)
                const hintElement = hintElementTemplate.querySelector('.quiz__hint')
                const hintElementContent = hintElementTemplate.querySelector('.quiz__hint-content')
                const hintElementTitle = hintElementTemplate.querySelector('.quiz__hint-title')
                hintElementContent.innerHTML = quiz.hints[key]
                hintElementTitle.innerHTML = `hint #${+key + 1}`
                hintElementTitle.addEventListener('click', this._toggleHint)
                document.querySelector('.quiz__hints').append(hintElement)
            }
        }
    }
    
    _disableSubmitAnswerBtn() {
        submitAnswer.classList.remove('quiz__button_state_active')
        submitAnswer.classList.add('quiz__button_state_disable')
    }
    
    _disableNextQuestionBtn() {
        nextQuestion.classList.remove('quiz__button_state_active')
        nextQuestion.classList.add('quiz__button_state_disable')
    }
    
    _clearQuizResult() {
        quizResultElement.classList.remove('quiz__result_active');
        quizSolutionElement.classList.remove('quiz__solution_active');
        quizResultCheckmarkElement.classList.remove('quiz__img_answer_right');
        quizResultCheckmarkElement.classList.remove('quiz__img_answer_wrong');
        quizResultCheckmarkElement.classList.remove('quiz__img_active');
    }
    
    _enableSubmitAnswerBtn() {
        submitAnswer.classList.add('quiz__button_state_active')
        submitAnswer.classList.remove('quiz__button_state_disable')
    }
    
    _toggleHint(evt) {
        evt.target.parentNode.querySelector('.quiz__hint-content').classList.toggle('quiz__hint-content_hidden')
    }
    
    _submitAnswerHandler(evt) {
        evt.preventDefault()
        if (form.elements['answer'][this._correctAnswer].checked) {
            quizResultCheckmarkElement.classList.add('quiz__img_answer_right');
            quizResultElement.innerHTML = resultMessages['passed'][Math.floor(Math.random() * resultMessages['passed'].length)]
            this._calculateScore(this._currentQuestionType, 1)
        } else {
            quizResultCheckmarkElement.classList.add('quiz__img_answer_wrong');
            quizResultElement.innerHTML = resultMessages['failed'][Math.floor(Math.random() * resultMessages['failed'].length)]
            this._calculateScore(this._currentQuestionType, 0)
        }
        form.elements['answer'].forEach(answerElement => {
            answerElement.disabled = true
        })
        this._displayQuizResult()
        this._disableSubmitAnswerBtn()
        this._enableNextQuestionBtn()
    }
    
    _displayQuizResult() {
        quizResultElement.classList.add('quiz__result_active')
        quizSolutionElement.classList.add('quiz__solution_active')
        quizResultCheckmarkElement.classList.add('quiz__img_active')
        quizSolutionElement.innerHTML = this._quizSolution
    }
    
    _enableNextQuestionBtn() {
        nextQuestion.classList.add('quiz__button_state_active')
        nextQuestion.classList.remove('quiz__button_state_disable')
    }
    
    setEventListeners() {
        startAnalogiesButton.addEventListener('click', this.startAnalogies)
        startMathButton.addEventListener('click', this.startMath)
        submitAnswer.addEventListener('click', this._submitAnswerHandler)
        nextQuestion.addEventListener('click', this._getNextQuestion)
    }
}
