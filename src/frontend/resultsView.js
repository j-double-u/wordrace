import { Events } from './events.js';

export class ResultsView {
    constructor() {}

    render() {
        const resultsViewElm = document.createElement('div');
        resultsViewElm.id = 'results-view';

        const titleElm = document.createElement('h1');
        titleElm.innerText = 'Results View';

        const resultsContainerElm = document.createElement('div');
        resultsContainerElm.id = 'results-container';

        resultsViewElm.appendChild(titleElm);
        resultsViewElm.appendChild(resultsContainerElm);

        const resultsTable = new ResultsTable();
        resultsContainerElm.appendChild(resultsTable.render());

        return resultsViewElm;
    }
}

class ResultsTable {
    #events = null;
    constructor() {
        this.#events = Events.events();
    }

    render() {
        const resultsTable = document.createElement('table');
        resultsTable.id = 'results-table';

        const headerRow = document.createElement('tr');
        const headerScore = document.createElement('th');
        headerScore.innerText = 'Score';
        headerRow.appendChild(headerScore);
        resultsTable.appendChild(headerRow);

        const yourRow = document.createElement('tr');
        const yourScore = document.createElement('td');
        yourRow.appendChild(yourScore);
        resultsTable.appendChild(yourRow);

        this.#events.subscribe('game-over', numCorrect => {
            yourScore.innerText = numCorrect;
        });

        return resultsTable;

    }
}