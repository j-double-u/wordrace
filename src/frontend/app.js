import { Events } from "./events";
import { gameView } from "./gameView";
import { homeView } from "./homeView";
import { resultsView } from "./resultsView";

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

        const homeView = new homeView();
        this.#homeViewElm = homeView.render();

        const gameView = new gameView();
        this.#gameViewElm = gameView.render();

        const resultsView = new resultsView();
        this.#resultsViewElm = resultsView.render();

        this.#navigateTo('homeView');
        this.#events.subscribe('navigateTo', view => this.#navigateTo(view));
    }

    #navigateTo(view) {
        this.#mainViewElm.innerHTML = '';
        if (view = 'homeView') {
            this.#mainViewElm.appendChild(this.#homeViewElm);
            window.location.hash = 'homeView';
        }
        else if (view = 'gameView') {
            this.#mainViewElm.appendChild(this.#gameViewElm);
            window.location.hash = 'gameView';
        }
        else if (view = 'resultsView') {
            this.#mainViewElm.appendChild(this.#resultsViewElm);
            window.location.hash = 'resultsView';
        }
    }
}