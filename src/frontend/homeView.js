import { Events } from './events.js';
import * as crud from './crud.js';

export class HomeView {
    #events = null;
    #personalBlurb = null;

    constructor() {
        this.#events = Events.events();
        this.#personalBlurb = null;
    }

    render() {
        const homeViewElm = document.createElement('div');
        homeViewElm.id = 'home-view';

        const logoutElm = document.createElement('button');
        logoutElm.id = 'logout';
        logoutElm.innerText = 'Logout';
        homeViewElm.appendChild(logoutElm);
        logoutElm.addEventListener('click', () => {
            this.#events.publish('navigateTo', 'loginView');
        })

        const titleElm = document.createElement('h1');
        titleElm.innerText = 'Home View';
        titleElm.classList.add('header')

        homeViewElm.appendChild(titleElm);

        this.#personalBlurb = document.createElement('div');
        homeViewElm.appendChild(this.#personalBlurb);

        const playButton = new PlayButton();
        homeViewElm.appendChild(playButton.render());

        this.#events.subscribe('displayPersonal', async (username) => {
            this.#personalBlurb.innerHTML = "";
            const readProfile = await crud.readProfile(username);
            if (!readProfile.ok) {
                this.#personalBlurb.innerHTML = '<p>Sorry. Personalized homepage could not be made.</p>';
            }
            else {
                const profile = await readProfile.json();
                this.#personalBlurb.innerHTML = `<p>Welcome ${profile['_id']}! Your high score is ${profile['highScore']}.</p>`;
            }
        });

        this.#events.subscribe('refreshWelcome', async (profile) => {
            this.refresh(profile);
        });

        return homeViewElm;
    }

    async refresh(profile) {
        this.#personalBlurb.innerHTML = "";
        this.#personalBlurb.innerHTML = `<p>Welcome ${profile['_id']}! Your high score is ${profile['highScore']}.</p>`;
    }
}

class PlayButton {
    #events = null;
    #clicked = 0;
    constructor() {
        this.#events = Events.events();
        this.#clicked = 0;
    }

    render() {
        const playButtonElm = document.createElement('button');
        playButtonElm.id = 'play-button';
        playButtonElm.innerText = 'Play!';

        playButtonElm.addEventListener('click', () => {
            this.#events.publish('navigateTo', 'gameView');
            this.#events.publish('startTimer');
            if (this.#clicked >= 1) {
                this.#events.publish('playAgain');
            }
            this.#clicked++;

        });

        return playButtonElm;
    }
}