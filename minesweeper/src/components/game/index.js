import BaseComponent from '../../utils/base-component';
import Field from '../field';

const defaultSettings = {
  rows: 10,
  cols: 10,
  bombs: 10,
};

export default class Game extends BaseComponent {
  constructor(parentNode, settings = defaultSettings) {
    super({ parentNode, className: 'game' });
    this.settings = settings;
    this.cellsToWin = this.settings.size ** 2 - this.settings.bombs;
    this.field = new Field(this, this.settings.rows, this.settings.cols, this.settings.bombs);
    this.isActive = false;
    this.init();
    this.increaseTime = () => { this.time += 1; };
    this.on('startGame', () => this.start());
    this.on('lose', () => this.end());
    this.on('move', () => { this.moves += 1; console.log('moves:', this.moves); });
    this.on('updateCellsCounter', (cellsNumber) => this.checkWin(cellsNumber));
    this.on('updateFlagsCounter', (isIncreased) => this.updateBombsLeftCounter(isIncreased));
    this.on('newGame', () => this.newGame());
  }

  init() {
    this.bombsLeft = this.settings.bombs;
    this.revealedCells = 0;
    this.moves = 0;
    this.time = 0;
  }

  newGame() {
    if (this.isActive) console.log('already active');
    this.isActive = false;
    this.field.reset();
    this.init();
  }

  start() {
    console.log('start');
    this.isActive = true;
    this.timer = setInterval(() => {
      this.increaseTime();
    }, 1000);
  }

  pause() {
    clearInterval(this.timer);
    this.isActive = false;
    console.log('seconds:', this.time);
  }

  end() {
    this.pause();
    console.log('end');
    console.log('moves:', this.moves);
  }

  checkWin(cellsNumber) {
    this.revealedCells = cellsNumber;
    if (this.revealedCells === this.cellsToWin) {
      console.log('win');
      this.end();
    }
  }

  updateBombsLeftCounter(isIncreased) {
    const difference = isIncreased ? 1 : -1;
    this.bombsLeft -= difference;
    console.log('bombsLeft', this.bombsLeft);
  }
}
