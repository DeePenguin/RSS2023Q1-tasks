import BaseComponent from '../../utils/base-component';

export default class GameUI extends BaseComponent {
  constructor(parentNode, settings) {
    super({
      parentNode,
      className: 'settings',
    });
    this.settings = settings;
    this.createUI();
    this.createLevelsButtons();
  }

  createUI() {
    this.newGameButton = new BaseComponent({
      tag: 'button',
      parentNode: this.node,
      className: 'new-game-button',
      content: 'New Game',
    });
    this.newGameButton.addListener('click', () => {
      this.emit('newGame');
    });

    this.pauseBtn = new BaseComponent({
      parentNode: this.node,
      tag: 'button',
      className: 'game-pause',
      content: 'Pause',
    });

    this.pauseBtn.addListener('click', () => this.emit('pause'));
  }

  createLevelsButtons() {
    const levelsWrapper = new BaseComponent({
      parentNode: this.node,
      className: 'levels-wrapper',
    });
    const { levels } = this.settings;
    Object.keys(levels).forEach((level) => {
      const props = levels[level];
      const content = `${level}: ${props.rows} x ${props.cols}, ${props.bombs} bombs`;
      const levelButton = new BaseComponent({
        tag: 'button',
        className: 'level-button',
        content,
      });
      levelButton.addListener('click', () => this.emit('changeLevel', props));
      levelsWrapper.append(levelButton);
    });
  }
}
