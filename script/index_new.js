// DOM elements constants
const startAnalogiesButton = document.querySelector('.quizes__start-analogies')
const startMathButton = document.querySelector('.quizes__start-math')
const submitAnswer = document.querySelector('.quiz__submit-answer')
const form = document.querySelector('.quiz')
const fullQuiz = document.querySelector('.quizes')
const nextQuestion = document.querySelector('.quiz__next-question')
const quizResultElement = fullQuiz.querySelector('.quiz__result')
const quizResultCheckmarkElement = fullQuiz.querySelector('.quiz__img')
const quizSolutionElement = fullQuiz.querySelector('.quiz__solution')
// Variables
const questionsSet = []
let analogiesQuestionsSet = []
let mathQuestionsSet = []
let correctAnswer
let quizSolution

questionSetPreparation = (arrLength) => {
    questionsSet.splice(0, arrLength)
    let randomNumber
    while (questionsSet.length < arrLength) {
        randomNumber = Math.floor(Math.random() * arrLength)
        if (questionsSet.indexOf(randomNumber) === -1) {
            questionsSet[questionsSet.length] = randomNumber
        }
    }
    return questionsSet
}

startQuiz = (currentQuestionType) => {
    if (currentQuestionType === 'Math') {
       mathQuiz()
    } else {
        analogiesQuiz()
    }
}



analogiesQuiz = () => {
    const numQuestion = analogiesQuestionsSet.shift()
    if (numQuestion === 'undefined') {
        questionSetPreparation(analogies.length)
        analogiesQuestionsSet = questionsSet.slice(0, questionsSet.length)
    }
    renderQuiz(analogies[numQuestion])
    
    startAnalogiesButton.classList.add('quizes__start_active')
    startMathButton.classList.remove('quizes__start_active')
}

mathQuiz = () => {
    const numQuestion = mathQuestionsSet.shift()
    console.log({numQuestion});
    if (numQuestion === undefined) {
        console.log({numQuestion});
        questionSetPreparation(math.length)
        mathQuestionsSet = questionsSet.slice(0, questionsSet.length)
        
        console.log({
            mathQuestionsSet
        })
    }
    console.log(math[numQuestion])
    renderQuiz(math[numQuestion])
    
    startMathButton.classList.add('quizes__start_active')
    startAnalogiesButton.classList.remove('quizes__start_active')
}

getNextQuestion = () => {
    const currentQuestionType = document.querySelector('.quizes__start_active').innerHTML
    startQuiz(currentQuestionType)
}

clearPreviousAnswers = () => {
    form.querySelectorAll('.quiz__answer-item').forEach(answer => answer.remove())
    document.querySelectorAll('.quiz__hint').forEach(hintContent => hintContent.remove())
    quizSolutionElement.innerHTML = ''
    quizResultElement.innerHTML = ''
    disableSubmitAnswerBtn()
    disableNextQuestionBtn()
    clearQuizResult()
}

disableNextQuestionBtn = () => {
    nextQuestion.classList.remove('quiz__next-question_active')
    nextQuestion.disabled = true;
}

enableNextQuestionBtn = () => {
    nextQuestion.classList.add('quiz__next-question_active')
    nextQuestion.disabled = false;
}

clearQuizResult = () => {
    quizResultElement.classList.remove('quiz__result_active');
    quizSolutionElement.classList.remove('quiz__solution_active');
    quizResultCheckmarkElement.classList.remove('quiz__img_answer_right');
    quizResultCheckmarkElement.classList.remove('quiz__img_answer_wrong');
    quizResultCheckmarkElement.classList.remove('quiz__img_active');
}

toggleHint = (evt) => {
    evt.target.parentNode.querySelector('.quiz__hint-content').classList.toggle('quiz__hint-content_hidden')
}

renderHints = (quiz) => {
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

disableSubmitAnswerBtn = () => {
    submitAnswer.classList.remove('quiz__submit-answer_active')
    submitAnswer.disabled = true;
}

renderQuiz = (quiz) => {
    document.querySelector('.quiz__question').innerHTML = quiz.question
    correctAnswer = quiz.correctAnswer
    quizSolution = quiz.solution
    clearPreviousAnswers()
    renderAnswers(quiz)
    renderHints(quiz)
}

submitButtonActivation = () => {
    submitAnswer.classList.add('quiz__submit-answer_active')
    submitAnswer.disabled = false;
}

displayQuizResult = () => {
    quizResultElement.classList.add('quiz__result_active')
    quizSolutionElement.classList.add('quiz__solution_active')
    quizResultCheckmarkElement.classList.add('quiz__img_active')
    quizSolutionElement.innerHTML = quizSolution
}

renderAnswers = (quiz) => {
    for (let key in quiz.answers) {
        if (quiz.answers.hasOwnProperty(key)) {
            const answerElement = document.querySelector('#quiz__answer').content.cloneNode(true)
            const answerLabel = answerElement.querySelector('.quiz__answer-label')
            const answerInput = answerElement.querySelector('.quiz__answer-input')
            answerLabel.innerHTML = quiz.answers[key]
            answerLabel.htmlFor = key
            answerInput.id = key
            answerInput.addEventListener('click', submitButtonActivation)
            document.querySelector('.quiz__answers').append(answerElement)
        }
    }
}

submitHandler = (evt) => {
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

mathQuiz()

startAnalogiesButton.addEventListener('click', startAnalogies)
startMathButton.addEventListener('click', startMath)
submitAnswer.addEventListener('click', submitHandler)
nextQuestion.addEventListener('click', getNextQuestion)
