export class Score {
    constructor(db, getUserInfo) {
        this._db=db
        this._getUserInfo = getUserInfo
    }
    
    reCalculateScore(userId, currentQuestionType, incrementCorrectAnswers) {
        this._db.collection("score").doc(userId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const allSubjectsTotal = doc.data().all_subjects.total + 1
                    const allSubjectsCorrect = doc.data().all_subjects.correct + incrementCorrectAnswers
                    if (currentQuestionType === 'math') {
                        const mathTotal = doc.data().math.total + 1
                        const mathCorrect = doc.data().math.correct + incrementCorrectAnswers
                        this.updateMathScore(userId, mathTotal, mathCorrect, allSubjectsTotal, allSubjectsCorrect)
                    } else {
                        const analogiesTotal = doc.data().analogies.total + 1
                        const analogiesCorrect = doc.data().analogies.correct + incrementCorrectAnswers
                        this.updateAnalogiesScore(userId, analogiesTotal, analogiesCorrect, allSubjectsTotal, allSubjectsCorrect)
                    }
                } else {
                    console.log("No such document!");
                }
            }).catch(error => console.log("Error getting document:", error));
    }
    
    updateMathScore(userId, mathTotal, mathCorrect, allSubjectsTotal, allSubjectsCorrect) {
        this._db.collection("score").doc(userId).update({
                math: {
                    total: mathTotal,
                    correct: mathCorrect
                },
                all_subjects: {
                    total: allSubjectsTotal,
                    correct: allSubjectsCorrect
                }
            })
            .then(() => {})
            .catch(error => console.error("Error updating document: ", error));
    }
    
    updateAnalogiesScore(userId, analogiesTotal, analogiesCorrect, allSubjectsTotal, allSubjectsCorrect) {
        this._db.collection("score").doc(userId).update({
                analogies: {
                    total: analogiesTotal,
                    correct: analogiesCorrect
                },
                all_subjects: {
                    total: allSubjectsTotal,
                    correct: allSubjectsCorrect
                }
            })
            .then(() => {})
            .catch(error => console.error("Error updating document: ", error));
    }
    
    resetScore(userId) {
        this._db.collection("score").doc(userId).update({
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
            .then(() => this._getUserInfo())
            .catch(error => console.error("Error updating document: ", error));
    }
    
    createScoreDocument(userId) {
        this._db.collection("score").doc(userId).set({
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
            .then(() => {})
            .catch((error) => console.error("Error writing document: ", error));
    }
    
    prepScoreToDisplay(doc) {
        const allSubjectsTotal = doc.data().all_subjects.total
        const allSubjectsCorrect = doc.data().all_subjects.correct
        const analogiesTotal = doc.data().analogies.total
        const analogiesCorrect = doc.data().analogies.correct
        const mathTotal = doc.data().math.total
        const mathCorrect = doc.data().math.correct
        return {
            allSubjectsTotal,
            allSubjectsCorrect,
            analogiesTotal,
            analogiesCorrect,
            mathTotal,
            mathCorrect
        }
    }
    
}