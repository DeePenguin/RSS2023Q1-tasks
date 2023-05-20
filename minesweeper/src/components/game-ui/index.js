import BaseComponent from '../../utils/base-component';
import './ui.scss';

export default class GameUI extends BaseComponent {
  constructor(parentNode, settings, score) {
    super({
      parentNode,
      className: 'settings',
    });
    this.settings = { ...settings };
    this.score = [...score];
    this.customSettings = { ...this.settings.lastLevel };
    this.createModal(parentNode);
    this.createUI();
    this.createScoreButton();
    this.on('updateScore', (newScore) => { this.score = newScore; });
    this.on('changeLevel', () => this.closeModal());
  }

  createUI() {
    this.newGameButton = new BaseComponent({
      tag: 'button',
      parentNode: this.node,
      className: 'btn-new-game-button',
      content: 'New Game',
    });
    this.newGameButton.addListener('click', () => {
      this.emit('newGame');
    });

    this.pauseBtn = new BaseComponent({
      parentNode: this.node,
      tag: 'button',
      className: 'btn-game-pause',
      content: 'Pause',
    });

    this.changeLevelBtn = new BaseComponent({
      parentNode: this.node,
      tag: 'button',
      className: 'btn-change-level',
      content: 'Change difficulty',
    });

    this.pauseBtn.addListener('click', () => this.emit('pause'));
    this.changeLevelBtn.addListener('click', () => this.showLevels());
  }

  createScoreButton() {
    this.scoreButton = new BaseComponent({
      parentNode: this.node,
      className: 'score-button',
      tag: 'button',
      content: 'Score',
    });
    this.scoreButton.addListener('click', () => this.showScore());
  }

  createModal(parentNode) {
    this.modal = new BaseComponent({
      parentNode,
      className: 'modal',
    });

    const closeButton = new BaseComponent({
      tag: 'button',
      className: 'modal-close',
      content: 'X',
    });
    closeButton.addListener('click', () => this.closeModal());
    this.modal.addListener('click', () => this.closeModal());
    this.modal.append(closeButton);
  }

  showScore() {
    this.emit('openModal');
    const header = new BaseComponent({
      className: 'modal-header',
      tag: 'h2',
      content: 'Score',
    });

    const theadContent = ['Size', 'Bombs', 'Moves', 'Time']
      .reduce((acc, item) => `${acc}<th class = "th">${item}</th>`, '');

    const table = new BaseComponent({
      tag: 'table',
      className: 'score-table',
      content: `<thead class = "thead"><tr class = "tr">${theadContent}</tr></thead>`,
    });

    const tbody = new BaseComponent({
      tag: 'tbody',
      className: 'tbody',
    });
    table.append(tbody);

    this.score.forEach(({
      size, bombs, time, moves,
    }) => {
      const row = new BaseComponent({
        tag: 'tr',
        content: `<td>${size}</td><td>${bombs}</td><td>${moves}</td><td>${time}</td>`,
        className: 't-row',
      });
      tbody.append(row);
    });

    this.modal.content = new BaseComponent({
      className: 'modal-content',
    });
    this.modal.content.append(header, table);
    this.modal.content.appendTo(this.modal);
    this.modal.content.addListener('click', (e) => e.stopPropagation());
    this.modal.addClass('open');
  }

  showLevels() {
    this.emit('openModal');
    this.modal.content = new BaseComponent({
      className: 'modal-content',
    });
    const levelsWrapper = new BaseComponent({
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

    const customLevel = new BaseComponent({
      className: 'custom-level',
      content: 'Custom',
    });

    Object.keys(this.customSettings).forEach((prop) => {
      const label = new BaseComponent({
        tag: 'label',
        className: 'custom-label',
        content: `${prop}: `,
      });
      const input = new BaseComponent({
        tag: 'input',
        className: 'input-number',
        attributes: {
          type: 'number',
          value: this.customSettings[prop],
        },
      });
      input.addListener('change', () => this.setCustomProperty(prop, Number(input.node.value)));
      label.append(input);
      customLevel.append(label);
    });

    const customStartBtn = new BaseComponent({
      tag: 'button',
      className: 'btn-custom-start',
      content: 'Start',
    });

    customStartBtn.addListener('click', () => this.emit('changeLevel', this.customSettings));

    customLevel.append(customStartBtn);
    this.modal.content.append(levelsWrapper, customLevel);
    this.modal.content.appendTo(this.modal);
    this.modal.addClass('open');
    this.modal.content.addListener('click', (e) => e.stopPropagation());
  }

  setCustomProperty(prop, value) {
    const [min, max] = [10, 99];
    const newValue = Math.min(max, Math.max(min, value));
    this.customSettings[prop] = newValue;
  }

  closeModal() {
    this.modal.removeClass('open');
    this.modal.content.remove();
  }
}
