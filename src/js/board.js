import "../css/board.css"
import "../css/goblin.css"
import goblinImage from '../img/goblin.png';

class Board {
  constructor(sideSize) {
    this._head = document.querySelector('.game-header');
    this._board = document.querySelector('.game-board');

    this._boardSize = sideSize * sideSize;
    this._board.style.setProperty('--size', sideSize);

    this._lastCell = -1;

    this._goblinElement = document.createElement('img');
    this._goblinElement.src = goblinImage;
    this._goblinElement.className = 'goblin';
    this._goblinElement.alt = 'Goblin';
  }

  build() {
    for (let i = 0; i < this._boardSize; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      this._board.append(cell);
    }
  }

  getRandomCell() {
    let randomCellNum;
    do {
      randomCellNum = Math.floor(Math.random() * this._boardSize);
    } while (
      randomCellNum === this._lastCell
    )
    const cell = this._board.children[randomCellNum];
    this._lastCell = randomCellNum;
    return cell;
  }

  placeGoblin() {
    const cell = this.getRandomCell();
    cell.append(this._goblinElement);
  }

  moveGoblins() {
    this._intervalId = setInterval(() => this.placeGoblin(), 1000);
  }

  stopMoving() {
    if (this._intervalId) clearInterval(this._intervalId);
  }

}

export default function buildBoard(sideSize) {
  const board = new Board(sideSize);
  board.build();
  board.placeGoblin();
  board.moveGoblins();
  // setTimeout(() => board.stopMoving(), 5000);
  return board;
}

console.log("board.js included");