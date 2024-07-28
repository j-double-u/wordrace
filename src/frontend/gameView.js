export class gameView {
    constructor() {}

    render() {
        const gameViewElm = document.createElement('div');
        gameViewElm = 'game-view';

        const titleElm = document.createElement('h1');
        titleElm.innerText = 'Game View';

        const gameContainerElm = document.createElement('div');
        gameContainerElm.id = 'game-container';

        gameViewElm.appendChild(titleElm);
        gameViewElm.appendChild(gameContainerElm);

        const gameInfo = new gameInfo();
        gameContainerElm.appendChild(gameInfo.render());

        return gameViewElm;
    }
}

class gameInfo {
    constructor() {}

    render() {

    }
}