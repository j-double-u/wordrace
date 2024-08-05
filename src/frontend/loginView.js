import { Events } from './events.js';

export class LoginView {
    #events = null;
    constructor() {
        this.#events = Events.events();
    }

    render() {
        const loginViewElm = document.createElement('div');
        loginViewElm.id = 'login-view';

        const titleElm = document.createElement('h1');
        titleElm.innerText = 'Login View';
        titleElm.classList.add('header');
        loginViewElm.appendChild(titleElm);

        const loginBlockElm = document.createElement('ol');

        const usernameElm = document.createElement('li');
        const usernameLabel = document.createElement('label');
        usernameLabel.for = 'username';
        usernameLabel.innerText = 'Username: ';
        const username = document.createElement('input');
        username.id = 'username';
        username.type = 'text';
        usernameElm.appendChild(usernameLabel);
        usernameElm.appendChild(username);
        loginBlockElm.appendChild(usernameElm);

        const passwordElm = document.createElement('li');
        const passwordLabel = document.createElement('label');
        passwordLabel.for = 'password';
        passwordLabel.innerText = 'Password: ';
        const password = document.createElement('input');
        password.id = 'password';
        password.type = 'text';
        passwordElm.appendChild(passwordLabel);
        passwordElm.appendChild(password);
        loginBlockElm.appendChild(passwordElm);

        const loginButtonElm = document.createElement('li');
        const loginButton = document.createElement('button');
        loginButton.id = 'login-button';
        loginButton.innerText = 'Login';
        loginButton.addEventListener('click', () => {
            // if username new create username with password and navigate to home

            // if username not new and password incorrect alert

            // if username not new and password correct navigate to home
        });
        loginButtonElm.appendChild(loginButton);
        loginBlockElm.appendChild(loginButtonElm);

        loginViewElm.appendChild(loginBlockElm);

        return loginViewElm
    }
}
