export class Api {
    constructor(initialSettings) {
        this._baseURL = initialSettings["baseUrl"];
    }
    
    getRandomNumberInfo(randomNumber) {
        return fetch(`http://numbersapi.com/${randomNumber}/math?json`, {
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(
                `No answer from the server`
            );
        });
    }
    
    getRandomFactInfo(randomNumber) {
        return fetch(`http://numbersapi.com/${randomNumber}/trivia?json`, {
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(
                `No answer from the server`
            );
        });
    }
}