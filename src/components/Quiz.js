import {startAnalogiesButton, startMathButton} from "../utils/constants.js";

export class Quiz {
    constructor() {
    }
    
    
    startMath() {
        startMathButton.classList.add('quizzes__start_active')
        startAnalogiesButton.classList.remove('quizzes__start_active')
        getNextQuestion()
    }
    
    
    
}
