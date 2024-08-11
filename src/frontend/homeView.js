import { Events } from './events.js';
import * as crud from './crud.js';

export class HomeView {
    #events = null;
    constructor() {
        this.#events = Events.events();
    }

    render() {
        const homeViewElm = document.createElement('div');
        homeViewElm.id = 'home-view';

        const titleElm = document.createElement('h1');
        titleElm.innerText = 'Home View';
        titleElm.classList.add('header')

        homeViewElm.appendChild(titleElm);

        const personalBlurb = document.createElement('div');
        homeViewElm.appendChild(personalBlurb);

        const playButton = new PlayButton();
        homeViewElm.appendChild(playButton.render());

        this.#events.subscribe('displayPersonal', async (username) => {
            personalBlurb.innerHTML = "";
            const readProfile = await crud.readProfile(username);
            if (!readProfile.ok) {
                personalBlurb.innerHTML = '<p>Sorry. Personalized homepage could not be made.</p>';
            }
            else {
                const profile = await readProfile.json();
                personalBlurb.innerHTML = `<p>Welcome ${profile['_id']}! Your high score is ${profile['highScore']}.</p>`;
            }
        });

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