import { Events } from "./events.js";

export class GameView {
    constructor() {}

    render() {
        const gameViewElm = document.createElement('div');
        gameViewElm.id = 'game-view';

        const titleElm = document.createElement('h1');
        titleElm.innerText = 'Game View';

        const gameContainerElm = document.createElement('div');
        gameContainerElm.id = 'game-container';

        gameViewElm.appendChild(titleElm);
        gameViewElm.appendChild(gameContainerElm);

        const gameInfo = new GameInfo();
        gameContainerElm.appendChild(gameInfo.render());

        return gameViewElm;
    }
}

class GameInfo {
    constructor() {}

    render() {
        const gameInfoElm = document.createElement('div');
        gameInfoElm.id = 'game-info';

        const timer = new Timer();
        const word = new Word();
        const definitionList = new DefinitionList();
        const timerElm = timer.render();
        const wordElm = word.render();
        const definitionListElm = definitionList.render();

        gameInfoElm.appendChild(timerElm);
        // gameInfoElm.appendChild(wordElm);
        // gameInfoElm.appendChild(definitionListElm);
        
        return gameInfoElm;
    }
}

class Timer {
    #events = null;
    constructor() {
        this.#events = Events.events();
    }

    render() {
        const timerElm = document.createElement('p');
        timerElm.id = 'timer';

        let curr = 60;

        const updateTimer = setInterval(updateTimeRemaining, 1000);
        function updateTimeRemaining() {
            timerElm.innerText = curr;
            curr--;
            if (curr === 0) {
                clearInterval(updateTimer);
                // no arg here, is this a problem?
                this.#events.publish('navigateTo', 'resultsView');
            }
        }

        return timerElm;
    }
}

class Word {
    constructor() {}

    render() {

    }
}

class DefinitionList {
    constructor() {}

    render() {

    }
}