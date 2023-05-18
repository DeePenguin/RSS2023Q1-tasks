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
    this.fieldBlocker = new BaseComponent({
      parentNode: this.field.node,
      className: 'game-blocker',
    });
    this.resultEl = new BaseComponent({
      parentNode: this.node,
      className: 'game-result',
    });
    this.isGameActive = false;
    this.increaseTime = () => { this.time += 1; this.renderTime(); };
    this.on('startGame', () => this.startTimer());
    this.on('lose', () => this.lose());
    this.on('move', () => { this.moves += 1; this.renderMoves(); });
    this.on('updateCellsCounter', (cellsNumber) => this.checkWin(cellsNumber));
    this.on('updateFlagsCounter', (isIncreased) => this.updateFlags(isIncreased));
    this.on('newGame', () => this.newGame());
  }

  init() {
    this.bombsLeft = this.settings.bombs;
    this.revealedCells = 0;
    this.moves = 0;
    this.flagsCounter = 0;
    this.time = 0;
    this.isEnded = false;
    this.isPaused = false;
    this.renderBombs();
    this.renderMoves();
    this.renderTime();
    this.renderFlags();
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
    this.flagsEl = new BaseComponent({
      parentNode: wrapper,
      className: 'game-flags',
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

  renderFlags() {
    this.flagsEl.setContent(this.flagsCounter);
  }

  newGame() {
    if (this.isGameActive) {
      this.end();
    }
    this.field.reset();
    this.init();
    this.fieldBlocker.toggleClass('active', this.isEnded);
    this.hideResult();
  }

  startTimer() {
    if (this.isEnded) return;
    this.isGameActive = true;
    this.timer = setInterval(() => {
      this.increaseTime();
    }, 1000);
  }

  stopTimer() {
    this.isGameActive = false;
    clearInterval(this.timer);
  }

  togglePause() {
    if (this.isEnded) return;
    this.isPaused = !this.isPaused;
    this.fieldBlocker.toggleClass('active', this.isPaused);
    this.fieldBlocker.toggleClass('paused', this.isPaused);
    if (this.isPaused) {
      this.stopTimer();
      return;
    }
    this.startTimer();
  }

  end() {
    this.stopTimer();
    this.isEnded = true;
    this.fieldBlocker.toggleClass('active', this.isEnded);
  }

  checkWin(cellsNumber) {
    this.revealedCells = cellsNumber;
    if (this.revealedCells === this.cellsToWin) {
      this.end();
      const message = `Hooray! You found all mines in ${this.time} seconds and ${this.moves} moves!`;
      this.showResult(message);
    }
  }

  lose() {
    this.end();
    const message = 'Game over. Try again';
    this.showResult(message);
  }

  showResult(content) {
    this.resultEl.message = new BaseComponent({
      content,
    });
    this.resultEl.append(this.resultEl.message);
  }

  hideResult() {
    this.resultEl.message?.remove();
  }

  updateFlags(isIncreased) {
    const difference = isIncreased ? 1 : -1;
    this.bombsLeft -= difference;
    this.flagsCounter += difference;
    this.renderBombs();
    this.renderFlags();
  }
}
