import BaseComponent from '../../utils/base-component';
import Field from '../field';
import './game.scss';

const defaultSettings = {
  rows: 10,
  cols: 10,
  bombs: 10,
};

export default class Game extends BaseComponent {
  constructor(parentNode, settings = defaultSettings) {
    super({ parentNode, className: 'game' });
    this.settings = settings;
    this.createStatusElements();
    this.init();
    this.cellsToWin = this.settings.rows * this.settings.cols - this.settings.bombs;
    this.field = new Field(this, this.settings.rows, this.settings.cols, this.settings.bombs);
    this.pausePopup = new BaseComponent({
      parentNode: this.field.node,
      className: 'popup-pause',
    });
    this.isActive = false;
    this.increaseTime = () => { this.time += 1; this.renderTime(); };
    this.on('startGame', () => this.startTimer());
    this.on('lose', () => this.end());
    this.on('move', () => { this.moves += 1; this.renderMoves(); });
    this.on('updateCellsCounter', (cellsNumber) => this.checkWin(cellsNumber));
    this.on('updateFlagsCounter', (isIncreased) => this.updateBombsLeftCounter(isIncreased));
    this.on('newGame', () => this.newGame());
  }

  init() {
    this.bombsLeft = this.settings.bombs;
    this.revealedCells = 0;
    this.moves = 0;
    this.time = 0;
    this.isEnded = false;
    this.isPaused = false;
    this.renderBombs();
    this.renderMoves();
    this.renderTime();
  }

  createStatusElements() {
    const wrapper = new BaseComponent({
      parentNode: this.node,
      className: 'game-status',
    });
    this.bombsEl = new BaseComponent({
      parentNode: wrapper,
      className: 'game-bombs',
    });
    this.movesEl = new BaseComponent({
      parentNode: wrapper,
      className: 'game-moves',
    });
    this.pauseBtn = new BaseComponent({
      parentNode: wrapper,
      tag: 'button',
      className: 'game-pause',
      content: 'Pause',
    });
    this.timeEl = new BaseComponent({
      parentNode: wrapper,
      className: 'game-time',
    });
    this.pauseBtn.addListener('click', () => this.togglePause());
  }

  renderTime() {
    this.timeEl.setContent(this.time.toString().padStart(3, '0'));
  }

  renderMoves() {
    this.movesEl.setContent(this.moves);
  }

  renderBombs() {
    this.bombsEl.setContent(this.bombsLeft);
  }

  newGame() {
    if (this.isActive) {
      this.end();
    }
    this.field.reset();
    this.init();
  }

  startTimer() {
    if (this.isEnded) return;
    this.isActive = true;
    this.timer = setInterval(() => {
      this.increaseTime();
    }, 1000);
  }

  stopTimer() {
    this.isActive = false;
    clearInterval(this.timer);
  }

  togglePause() {
    if (this.isEnded) return;
    this.isPaused = !this.isPaused;
    this.pausePopup.toggleClass('active', this.isPaused);
    if (this.isPaused) {
      this.stopTimer();
      return;
    }
    this.startTimer();
  }

  end() {
    this.stopTimer();
    this.isEnded = true;
    console.log('end');
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
    this.renderBombs();
  }
}
