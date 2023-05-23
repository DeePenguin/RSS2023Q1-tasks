import EventEmitter from '../../utils/event-emitter';
import Game from '../game';
import GameUI from '../game-ui';
import preferences from './default-preferences.json';
import './app.scss';
import Sound from '../sound';

const lsPrefix = 'DeePee-MineSweeper';

function saveToLs(key, value) {
  localStorage.setItem(`${lsPrefix}-${key}`, JSON.stringify(value));
}

function getFromLs(key) {
  const value = localStorage.getItem(`${lsPrefix}-${key}`);
  return value ? JSON.parse(value) : null;
}

function removeFromLs(key) {
  localStorage.removeItem(`${lsPrefix}-${key}`);
}

export default class App extends EventEmitter {
  constructor(parentNode) {
    super();
    this.parentNode = parentNode;
    this.getSettings();
    this.getScore();
    this.getLastGame();
    this.changeTheme(this.settings.darkTheme);
    this.game = new Game(parentNode, this.settings.lastLevel);
    if (this.lastGame) this.game.restore(this.lastGame);
    this.ui = new GameUI(parentNode, this.settings, this.score);
    this.sound = new Sound(this.settings);
    this.on('win', (props) => this.saveResult(props));
    this.on('startGame', () => this.saveSettings()); // change event
    this.on('changeLevel', (props) => this.handleFieldChange(props));
    this.on('changeTheme', (isDark) => this.changeTheme(isDark));
    this.on('changeSounds', (isSoundsOn) => this.changeSounds(isSoundsOn));
  }

  getSettings() {
    this.settings = getFromLs('settings') ?? preferences;
    this.settings.lastLevel = this.settings.lastLevel ?? { ...this.settings.levels.easy };
  }

  saveSettings() {
    saveToLs('settings', this.settings);
  }

  getScore() {
    this.score = getFromLs('score') ?? [];
  }

  saveResult({ time, moves }) {
    const lastResult = {
      size: `${this.settings.lastLevel.rows} x ${this.settings.lastLevel.cols}`,
      bombs: this.settings.lastLevel.bombs,
      time,
      moves,
    };
    if (this.score.length >= 10) this.score.length = 9;
    this.score = [lastResult, ...this.score];
    this.emit('updateScore', this.score);
    saveToLs('score', this.score);
  }

  getLastGame() {
    this.lastGame = getFromLs('lastGame');
    removeFromLs('lastGame');
  }

  saveCurrentGame() {
    if (this.game.isGameActive) {
      const gameState = this.game.save();
      saveToLs('lastGame', gameState);
    }
  }

  handleFieldChange(props) {
    const diff = Object.keys(props).filter((key) => props[key] !== this.settings.lastLevel[key]);
    if (diff.length) {
      this.settings.lastLevel = { ...props };
      this.saveSettings();
      this.game.changeField(props);
    }
    this.game.newGame();
  }

  changeTheme(isDark) {
    this.parentNode.toggleClass('theme-dark', isDark);
    this.settings.darkTheme = isDark;
    this.saveSettings();
  }

  changeSounds(isSoundsOn) {
    this.settings.sounds = isSoundsOn;
    this.saveSettings();
  }
}
