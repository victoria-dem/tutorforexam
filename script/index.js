const startAnalogiesButton = document.querySelector('.quizes__start-analogies')
const startMathButton = document.querySelector('.quizes__start-math')
const submitAnswer = document.querySelector('.quiz__submit-answer')
const form = document.querySelector('.quiz')
const fullQuiz = document.querySelector('.quizes')
const nextQuestion = document.querySelector('.quiz__next-question')

let correctAnswer;
let quizSolution;
let currentQuestionType;

startAnalogies = () => {
    const numQuestion = Math.floor(Math.random() * analogies.length)
    renderQuiz(analogies[numQuestion])
    currentQuestionType = 'analogies'
}

startMath = () => {
    const numQuestion = Math.floor(Math.random() * math.length)
    renderQuiz(math[numQuestion])
    currentQuestionType = 'math'
}

getNextQuestion = () => {
    if (currentQuestionType==='analogies') {
        startAnalogies()
    } else {startMath()}
}


clearPreviousAnswers = () => {
    form.querySelectorAll('.quiz__answer-label').forEach(answer => answer.parentNode.remove())
    form.querySelectorAll('.quiz__answer-input').forEach(answer => answer.parentNode.remove())
    document.querySelectorAll('.quiz__hint-content').forEach(hintContent => hintContent.remove())
    document.querySelectorAll('.quiz__hint-title').forEach(hintTitle => hintTitle.remove())
    fullQuiz.querySelector('.quiz__solution').innerHTML = ''
    fullQuiz.querySelector('.quiz__result').innerHTML = ''
    submitAnswer.classList.remove('quiz__submit-answer_active')
    submitAnswer.disabled = true;
    nextQuestion.classList.remove('quiz__next-question_active')
    nextQuestion.disabled = true;
}

toggleHint = (evt) => {
    evt.target.parentNode.querySelector('.quiz__hint-content').classList.toggle('quiz__hint-content_hidden')
}

renderHints = (quiz) => {
    for (let key in quiz.hints) {
        const hintElementTemplate = document.querySelector('#quiz__hint').content.cloneNode(true)
        const hintElement = hintElementTemplate.querySelector('.quiz__hint')
        const hintElementContent = hintElementTemplate.querySelector('.quiz__hint-content')
        const hintElementTitle = hintElementTemplate.querySelector('.quiz__hint-title')
        hintElementContent.innerHTML = quiz.hints[key]
        hintElementTitle.innerHTML = `Hint #${+key + 1}`
        hintElementTitle.addEventListener('click', toggleHint)
        document.querySelector('.quiz__hints').append(hintElement)
    }
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

renderAnswers = (quiz) => {
    for (let key in quiz.answers) {
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

submitHandler = (evt) => {
    evt.preventDefault()
    if (form.elements['answer'][correctAnswer].checked) {
        fullQuiz.querySelector('.quiz__result').innerHTML = 'OK OK OK OK OK OK OK OK OK OK '
    } else {
        fullQuiz.querySelector('.quiz__result').innerHTML = 'NOT OK NOT OK NOT OK NOT OK NOT OK '
    }
    submitAnswer.classList.remove('quiz__submit-answer_active')
    submitAnswer.disabled = true;
    form.elements['answer'].forEach(answerElement => {
        answerElement.disabled = true
    })
    fullQuiz.querySelector('.quiz__solution').innerHTML = quizSolution
    nextQuestion.classList.add('quiz__next-question_active')
    nextQuestion.disabled = false;
    
}

startAnalogiesButton.addEventListener('click', startAnalogies)
startMathButton.addEventListener('click', startMath)
submitAnswer.addEventListener('click', submitHandler)
nextQuestion.addEventListener('click', getNextQuestion)