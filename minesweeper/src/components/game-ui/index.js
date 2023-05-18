import BaseComponent from '../../utils/base-component';

export default class GameUI extends BaseComponent {
  constructor(parentNode) {
    super({
      parentNode,
      className: 'settings',
    });
    this.createUI();
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

    // Object.keys(levels).forEach((level) => {
    //   const props = levels[level];
    //   const content = `${level}: ${props.rows} x ${props.cols}, ${props.bombs} bombs`;
    //   const levelButton = new BaseComponent({
    //     tag: 'button',
    //     parentNode: this.node,
    //     className: 'level-button',
    //     content,
    //   });
    // });
  }
}
