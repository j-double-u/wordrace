import { Events } from './events.js';
import * as crud from './crud.js';

export class ResultsView {
    #events = null;
    #username = "";


    constructor() {
        this.#events = Events.events();
        this.#username = "";
    }

    render() {
        const resultsViewElm = document.createElement('div');
        resultsViewElm.id = 'results-view';

        const goBackElm = document.createElement('button');
        goBackElm.id = 'goBack';
        goBackElm.innerText = 'Go Back';
        goBackElm.addEventListener('click', async () => {
            const readProfile = await crud.readProfile(this.#username);
            if (!readProfile.ok) {
                alert("Could not carry over stats.");
            }
            else {
                const profile = await readProfile.json();
                this.#events.publish('navigateTo', 'homeView'); 
                this.#events.publish('refreshWelcome', profile);
            }
        });

        this.#events.subscribe('displayPersonal', profile => {
            this.#username = profile;
        })

        const titleElm = document.createElement('h1');
        titleElm.innerText = 'Results View';
        titleElm.classList.add('header')


        const resultsContainerElm = document.createElement('div');
        resultsContainerElm.id = 'results-container';

        resultsViewElm.appendChild(titleElm);
        resultsViewElm.appendChild(resultsContainerElm);
        resultsViewElm.appendChild(goBackElm);

        const resultsTable = new ResultsTable();
        resultsContainerElm.appendChild(resultsTable.render());

        return resultsViewElm;
    }
}

class ResultsTable {
    #events = null;
    #username = "";

    constructor() {
        this.#events = Events.events();
        this.#username = "";
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

        this.#events.subscribe('displayPersonal', profile => {
            this.#username = profile;
        })
        
        this.#events.subscribe('game-over', async (numCorrect) => {
            // sets the new score before it renders?
            const readProfile = await crud.readProfile(this.#username);
            if (!readProfile.ok) {
                alert("Could not update profile.");
            }
            else {
                const profile = await readProfile.json();
                if (numCorrect > profile['highScore']) {
                    const updatehighScore = await crud.updatehighScore(this.#username, numCorrect);
                    if (!updatehighScore.ok) {
                        alert("Could not update profile.");
                    }
                }
            }
            yourScore.innerText = numCorrect;  
        });

        return resultsTable;

    }
}