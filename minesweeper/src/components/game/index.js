import BaseComponent from '../../utils/base-component';
import Field from '../field';

const defaultSettings = {
  size: 10,
  bombsAmount: 10,
};

export default class Game extends BaseComponent {
  constructor(parentNode, settings = defaultSettings) {
    super({ parentNode, className: 'game' });
    this.settings = settings;
    this.cellsToWin = this.settings.size ** 2 - this.settings.bombsAmount;
    this.bombsLeft = this.settings.bombsAmount;
    this.revealedCells = 0;
    this.field = new Field(this, settings);
    this.isActive = false;
    this.moves = 0;
    this.time = 0;
    this.increaseTime = () => { this.time += 1; };
    this.on('startGame', () => this.start());
    this.on('lose', () => this.end());
    this.on('clickOnCell', () => { this.moves += 1; });
    this.on('updateCellsCounter', (cellsNumber) => this.checkWin(cellsNumber));
    this.on('updateFlagsCounter', (isIncreased) => this.updateBombsLeftCounter(isIncreased));
  }

  init() {

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
    console.log(this.moves);
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
