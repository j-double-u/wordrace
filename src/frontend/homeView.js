import { Events } from './events.js';

export class HomeView {
    constructor() {}

    render() {
        const homeViewElm = document.createElement('div');
        homeViewElm.id = 'home-view';

        const titleElm = document.createElement('h1');
        titleElm.innerText = 'Home View';
        titleElm.classList.add('header')

        homeViewElm.appendChild(titleElm);

        const playButton = new PlayButton();
        homeViewElm.appendChild(playButton.render());

        return homeViewElm;
    }
}

class PlayButton {
    #events = null;
    constructor() {
        this.#events = Events.events();
    }

    render() {
        const playButtonElm = document.createElement('button');
        playButtonElm.id = 'play-button';
        playButtonElm.innerText = 'Play!';

        playButtonElm.addEventListener('click', () => {
            this.#events.publish('navigateTo', 'gameView');
        });

        return playButtonElm;
    }
}