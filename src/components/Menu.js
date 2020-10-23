import {
    hamburgerMenuElement,
    loggedInElements,
    loggedOutElements,
    logOutButton,
    logInButton,
    accountButton,
    signUpButton,
    authMenuElement, animationOpenTime, animationCloseTime
} from "../utils/constants.js";

export class Menu {
    constructor(auth, isUserNew) {
        this._auth = auth
        this._isUserNew = isUserNew
        this.toggleHamburgerMenuState = this.toggleHamburgerMenuState.bind(this)
    }
    
    _renderMenu(user, isHamburgerMenuVisible) {
        if (isHamburgerMenuVisible === true) {
            hamburgerMenuElement.classList.remove('auth__hamburger_state_opened')
            this._renderClosedHamburgerMenu(user)
        } else {
            loggedOutElements.forEach(element => element.classList.remove('auth__hamburger-closed'))
            loggedOutElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
            loggedInElements.forEach(element => element.classList.remove('auth__hamburger-closed'))
            loggedInElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
        }
        
        if (user === null) {
            this._renderLogOutUser()
        } else {
            this._renderLogInUser(user)
        }
    }
    
    _renderClosedHamburgerMenu(isUserActive) {
        if (!isUserActive) {
            loggedOutElements.forEach(element => element.classList.add('auth__hamburger-closed'))
            loggedOutElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
            loggedInElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
        } else {
            loggedInElements.forEach(element => element.classList.add('auth__hamburger-closed'))
            loggedInElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
            loggedOutElements.forEach(element => element.classList.remove('auth__hamburger-opened'))
        }
    }
    
    _renderOpenedHamburgerMenu(isUserActive) {
        if (!isUserActive) {
            loggedOutElements.forEach(element => element.classList.remove('auth__hamburger-closed'))
            loggedOutElements.forEach(element => element.classList.add('auth__hamburger-opened'))
        } else {
            loggedInElements.forEach(element => element.classList.remove('auth__hamburger-closed'))
            loggedInElements.forEach(element => element.classList.add('auth__hamburger-opened'))
        }
    }
    
    _renderLogOutUser() {
        loggedInElements.forEach(element => element.classList.add('auth__item_hide'))
        loggedOutElements.forEach(element => element.classList.remove('auth__item_hide'))
        logInButton.innerHTML = 'login'
        signUpButton.innerHTML = 'signup'
    }
    
    _renderLogInUser(user) {
        loggedInElements.forEach(element => element.classList.remove('auth__item_hide'))
        loggedOutElements.forEach(element => element.classList.add('auth__item_hide'))
        logOutButton.innerHTML = 'logout'
        accountButton.innerHTML = 'account'
        this._isUserNew(user)
    }
    
    _toggleHamburgerMenu(isUserActive) {
        if (hamburgerMenuElement.classList.contains("auth__hamburger_state_opened")) {
            if (document.documentElement.clientWidth < 426) {
                this._openHamburgerAuthMenuAnimation()
                setTimeout(() => {
                    this._renderOpenedHamburgerMenu(isUserActive)
                    this._openHamburgerAuthElementsAnimation()
                }, animationOpenTime)
            } else {
                this._renderOpenedHamburgerMenu(isUserActive)
            }
        } else {
            this._closeHamburgerAuthElementsAnimation()
            setTimeout(() => {
                this._renderClosedHamburgerMenu(isUserActive)
                this._closeHamburgerAuthMenuAnimation()
            }, animationCloseTime)
            
        }
    }
    
    _closeHamburgerAuthMenuAnimation() {
        authMenuElement.classList.remove('auth_animation_open')
        authMenuElement.classList.add('auth_animation_close')
    }
    
    _openHamburgerAuthMenuAnimation() {
        authMenuElement.classList.remove('auth_animation_close')
        authMenuElement.classList.add('auth_animation_open')
    }
    
    _closeHamburgerAuthElementsAnimation() {
        loggedInElements.forEach(element => element.classList.add('auth__item_animation_close'))
        loggedOutElements.forEach(element => element.classList.add('auth__item_animation_close'))
        loggedInElements.forEach(element => element.classList.remove('auth__item_animation_open'))
        loggedOutElements.forEach(element => element.classList.remove('auth__item_animation_open'))
    }
    
    _openHamburgerAuthElementsAnimation() {
        loggedInElements.forEach(element => element.classList.add('auth__item_animation_open'))
        loggedOutElements.forEach(element => element.classList.add('auth__item_animation_open'))
        loggedInElements.forEach(element => element.classList.remove('auth__item_animation_close'))
        loggedOutElements.forEach(element => element.classList.remove('auth__item_animation_close'))
    }
    
    toggleHamburgerMenuState() {
        const togglePromise = new Promise((resolve) => {
            const user = this._auth.currentUser;
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        }).then(isUserActive => this._toggleHamburgerMenu(isUserActive))
            .catch(error => console.error(error))
    }
    
    checkMenuElement() {
        const authStateChangedPromise = new Promise((resolve, reject) => {
            this._auth.onAuthStateChanged(user => {
                resolve(user)
                reject('error')
            })
        }).catch((reason => console.error(reason)))
        
        const hamburgerDisplayStylePromise = new Promise((resolve, reject) => {
            const hamburgerDisplayStyle = window.getComputedStyle(hamburgerMenuElement).display
            if (hamburgerDisplayStyle !== 'none') {
                resolve(true)
            } else if (hamburgerDisplayStyle === 'none') {
                resolve(false)
            } else {
                reject('error with hamburgerDisplayStyle')
            }
        }).catch((reason => console.error(reason)))
        
        const promises = [authStateChangedPromise, hamburgerDisplayStylePromise]
        Promise.all(promises)
            .then((results) => {
                const user = results[0];
                const isHamburgerMenuVisible = results[1]
                this._renderMenu(user, isHamburgerMenuVisible)
            });
    }
    
    
}
