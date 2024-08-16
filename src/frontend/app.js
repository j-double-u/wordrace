import { Events } from "./events.js";
import { GameView } from "./gameView.js";
import { HomeView } from "./homeView.js";
import { LoginView } from "./loginView.js";
import { ResultsView } from "./resultsView.js";

export class App {
    #homeViewElm = null;
    #gameViewElm = null;
    #resultsViewElm = null;
    #loginViewElm = null;
    #mainViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    render(root){
        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';

        const loginElm = document.createElement('button');
        loginElm.id = 'login';
        loginElm.innerText = 'Login';
        rootElm.appendChild(loginElm);
        loginElm.addEventListener('click', () => {
            this.#navigateTo('loginView');
        })

        this.#mainViewElm = document.createElement('div');
        this.#mainViewElm.id = 'main-view';

        rootElm.appendChild(this.#mainViewElm);

        const homeView = new HomeView();
        this.#homeViewElm = homeView.render();

        const gameView = new GameView();
        this.#gameViewElm = gameView.render();

        const resultsView = new ResultsView();
        this.#resultsViewElm = resultsView.render();

        const loginView = new LoginView();
        this.#loginViewElm = loginView.render();

        this.#navigateTo('homeView');
        this.#events.subscribe('navigateTo', view => this.#navigateTo(view));
    }

    #navigateTo(view) {
        this.#mainViewElm.innerHTML = '';
        if (view === 'homeView') {
            this.#mainViewElm.appendChild(this.#homeViewElm);
            window.location.hash = 'homeView';
        }
        else if (view === 'gameView') {
            this.#mainViewElm.appendChild(this.#gameViewElm);
            window.location.hash = 'gameView';
        }
        else if (view === 'resultsView') {
            this.#mainViewElm.appendChild(this.#resultsViewElm);
            window.location.hash = 'resultsView';
        }
        else if (view === 'loginView') {
            this.#mainViewElm.appendChild(this.#loginViewElm);
            window.location.hash = 'loginView';
        }

    }
}