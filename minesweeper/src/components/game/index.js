import BaseComponent from '../../utils/base-component';
import Field from '../field';

const defaultSettings = {
  size: 10,
  bombsAmount: 10,
};

export default class Game extends BaseComponent {
  constructor(parentNode, settings = defaultSettings) {
    super({ parentNode });
    this.settings = settings;
    this.field = new Field(parentNode, settings);
    this.isActive = false;
    this.on('startGame', () => this.start());
    this.on('bomb', () => this.end());
  }

  init() {

  }

  start() {
    console.log('start');
  }

  end() {
    console.log('end');
  }

  checkIfEnd() {

  }
}
