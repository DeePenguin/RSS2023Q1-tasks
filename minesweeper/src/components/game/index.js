import BaseComponent from '../../utils/base-component';
import Field from '../field';
import './game.scss';

export default class Game extends BaseComponent {
  constructor(parentNode, settings) {
    super({ parentNode, className: 'game' });
    this.settings = settings;
    this.createStatusElements();
    this.init();
    this.fieldWrapper = new BaseComponent({
      parentNode: this,
      className: 'field-wrapper',
    });
    this.field = new Field(this.fieldWrapper, this.settings);
    this.createFieldBlocker();
    this.resultEl = new BaseComponent({
      parentNode: this.node,
      className: 'game-result',
    });
    this.increaseTime = () => { this.time += 1; this.renderTime(); };
    this.on('startGame', () => { this.gameStarted = true; this.startTimer(); });
    this.on('lose', () => this.lose());
    this.on('move', () => { this.moves += 1; this.renderMoves(); });
    this.on('updateCellsCounter', (cellsNumber) => this.checkWin(cellsNumber));
    this.on('updateFlagsCounter', (isIncreased) => this.updateFlags(isIncreased));
    this.on('newGame', () => this.newGame());
    this.on('pause', () => this.togglePause());
    this.on('openModal', () => { if (this.isGameActive && !this.isPaused) this.togglePause(); });
  }

  init() {
    this.isGameActive = false;
    this.gameStarted = false;
    this.bombsLeft = this.settings.bombs;
    this.cellsToWin = this.settings.rows * this.settings.cols - this.settings.bombs;
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

  createFieldBlocker() {
    this.fieldBlocker = new BaseComponent({
      parentNode: this.field.node,
      className: 'game-blocker',
    });
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
    this.timeEl = new BaseComponent({
      parentNode: wrapper,
      className: 'game-time',
    });
  }

  renderTime() {
    this.timeEl.setContent(Math.min(999, this.time).toString().padStart(3, '0'));
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
    this.fieldBlocker.toggleClass('paused', this.isPaused);
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
    clearInterval(this.timer);
  }

  togglePause() {
    if (this.isEnded || !this.gameStarted) return;
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
    this.isGameActive = false;
    this.isEnded = true;
    this.fieldBlocker.toggleClass('active', this.isEnded);
  }

  checkWin(cellsNumber) {
    if (cellsNumber === this.cellsToWin) {
      this.end();
      const message = `Hooray! You found all mines in ${this.time} seconds and ${this.moves} moves!`;
      this.showResult(message);
      this.emit('win', { time: this.time, moves: this.moves });
    }
  }

  lose() {
    this.end();
    const message = 'Game over. Try again';
    this.showResult(message);
  }

  showResult(content) {
    this.resultEl.setContent(content);
  }

  hideResult() {
    this.resultEl.setContent('');
  }

  updateFlags(isIncreased) {
    const difference = isIncreased ? 1 : -1;
    this.bombsLeft -= difference;
    this.flagsCounter += difference;
    this.renderBombs();
    this.renderFlags();
  }

  save() {
    return {
      time: this.time,
      moves: this.moves,
      flags: this.flagsCounter,
      field: this.field.save(),
    };
  }

  restore(state) {
    this.moves = state.moves;
    this.time = state.time;
    this.flagsCounter = state.flags;
    this.bombsLeft -= this.flagsCounter;
    this.field.restore(state.field);
    this.gameStarted = true;
    this.startTimer();
    this.togglePause();
    this.renderBombs();
    this.renderMoves();
    this.renderTime();
    this.renderFlags();
  }

  changeField({ rows, cols, bombs }) {
    if (this.settings.rows === rows && this.settings.cols === cols) {
      this.settings.bombs = bombs;
      this.emit('changeBombsAmount', bombs);
      this.end();
      this.hideResult();
      this.init();
      this.fieldBlocker.toggleClass('active', this.isEnded);
      this.fieldBlocker.toggleClass('paused', this.isPaused);
      return;
    }
    this.settings.rows = rows;
    this.settings.cols = cols;
    this.settings.bombs = bombs;
    this.end();
    this.field.changeSize(rows, cols, bombs);
    this.createFieldBlocker();
    this.hideResult();
    this.init();
  }
}
