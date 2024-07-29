import { Events } from "./events.js";
import { GameView } from "./gameView.js";
import { HomeView } from "./homeView.js";
import { ResultsView } from "./resultsView.js";

export class App {
    #homeViewElm = null;
    #gameViewElm = null;
    #resultsViewElm = null;
    #mainViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    render(root){
        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';

        this.#mainViewElm = document.createElement('div');
        this.#mainViewElm.id = 'main-view';

        rootElm.appendChild(this.#mainViewElm);

        const homeView = new HomeView();
        this.#homeViewElm = homeView.render();

        const resultsView = new ResultsView();
        this.#resultsViewElm = resultsView.render();

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
            const gameView = new GameView();
            this.#gameViewElm = gameView.render();
            this.#mainViewElm.appendChild(this.#gameViewElm);
            window.location.hash = 'gameView';
        }
        else if (view === 'resultsView') {
            this.#mainViewElm.appendChild(this.#resultsViewElm);
            window.location.hash = 'resultsView';
        }
    }
}