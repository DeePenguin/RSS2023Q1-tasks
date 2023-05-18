import EventEmitter from '../../utils/event-emitter';
import Game from '../game';
import GameUI from '../game-ui';
import preferences from './default-preferences.json';

const lsPrefix = 'DeePee-MineSweeper';

export default class App extends EventEmitter {
  constructor(parentNode) {
    super();
    this.settings = this.getSettings();
    this.score = this.getScore();
    this.game = new Game(parentNode, this.settings);
    this.ui = new GameUI(parentNode, preferences);
    this.on('win', (props) => this.saveResult(props));
  }

  getSettings() {
    return preferences.levels.easy;
  }

  getScore() {
    const lsScore = localStorage.getItem(`${lsPrefix}-score`);
    return lsScore ? JSON.parse(lsScore) : [];
  }

  saveResult({ time, moves }) {
    const lastResult = {
      size: `${this.settings.rows} x ${this.settings.cols}`,
      bombs: this.settings.bombs,
      time,
      moves,
    };
    if (this.score.length >= 10) this.score.length = 9;
    this.score = [lastResult, ...this.score];
    localStorage.setItem(`${lsPrefix}-score`, JSON.stringify(this.score));
  }
}
