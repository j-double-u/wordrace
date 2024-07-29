import { dictionary, keys } from "./dictionary.js";
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
        const definitionListElm = definitionList.render();
        const wordElm = word.render();
        

        gameInfoElm.appendChild(timerElm);
        gameInfoElm.appendChild(wordElm);
        gameInfoElm.appendChild(definitionListElm);
        
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
                this.#events.publish('timeout', 0);
                
            }
        }

        return timerElm;
    }
}

class Word {
    #events = null;
    #numProblems = 0;
    #numCorrect = 0;
    #wordElm = null;
    
    constructor() {
        this.#events = Events.events();
    }

    render() {

        this.#numProblems++;

        if (this.#numProblems === 1) {
            this.#wordElm = document.createElement('p');
            this.#wordElm.id = 'word';
            // needs to change when person clicks on def (need to use this.render()???)
            this.#events.subscribe('timeout', num => {
                //switch ordering?
                this.#events.publish('game-over', this.#numCorrect);
                this.#events.publish('navigateTo', 'resultsView');
            })
            this.#events.subscribe('def-clicked', answeredNum => {
                if (keys[answeredNum] === this.#wordElm.innerText) {
                    this.#numCorrect++;
                }  
                this.render();
            });
        }

        if (this.#numProblems > 10) {
            //publish when done with ten problems
            //switch ordering?
            this.#events.publish('game-over', this.#numCorrect);
            this.#events.publish('navigateTo', 'resultsView');
        }
        else {
            const wordNum = Math.floor(Math.random() * keys.length);
            this.#wordElm.innerText = keys[wordNum];

            // Give the definition list the word
            this.#events.publish('word-generated', wordNum);
        }
        return this.#wordElm;
    }

}

class DefinitionList {
    #events = null;
    #tasks = [];
    #list = null;

    constructor() {
        this.#events = Events.events();
    }

    render() {
        const definitionListElm = document.createElement('div');
        definitionListElm.id = 'definition-list';

        this.#list = document.createElement('ul');
        definitionListElm.appendChild(this.#list);

        this.#events.subscribe('word-generated', wordNum => {
            this.#tasks = [];
            this.#list.innerHTML = "";
            
            const correctNum = wordNum;
            this.#tasks.push(correctNum);
            for (let i = 0; i < 3; i++) {
                this.#tasks.push(Math.floor(Math.random() * keys.length))
            }
            this.#tasks.sort();
            const definitionElements = this.#tasks.map(wordNum => this.#makeDefinitionElement(wordNum));

            definitionElements.forEach(element => this.#list.appendChild(element));

        });

        return definitionListElm;
    }

    #makeDefinitionElement(wordNum) {
        const definitionElm = document.createElement('button');
        definitionElm.classList.add('definition');
        definitionElm.innerText = dictionary[keys[wordNum]];


        definitionElm.addEventListener('click', () => {
            //let word know to change the word
            //let word list know to recount the correct answers
            this.#events.publish('def-clicked', wordNum);

        });

        return definitionElm;
    }


}