import Field from '../field';

const settings = {
  size: 10,
  bombsAmount: 10,
};

export default class App {
  constructor() {
    this.field = new Field(document.body, settings.size, settings.bombsAmount);
  }
}
