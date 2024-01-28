import BaseComponent from '../../utils/base-component';
import './ui.scss';

export default class GameUI extends BaseComponent {
  constructor(parentNode, settings, score) {
    super({
      parentNode,
      className: 'settings',
    });
    this.parentNode = parentNode;
    this.settings = { ...settings };
    this.score = [...score];
    this.customSettings = { ...this.settings.lastLevel };
    this.createModal(parentNode);
    this.createGameButtons();
    this.createSettingsWrapper();
    this.on('updateScore', (newScore) => { this.score = newScore; });
    this.on('changeLevel', () => this.closeModal());
  }

  createGameButtons() {
    const gameButtonsWrapper = new BaseComponent({
      parentNode: this,
      className: 'game-buttons',
    });
    this.newGameButton = new BaseComponent({
      tag: 'button',
      parentNode: gameButtonsWrapper,
      className: 'btn btn-new-game',
      content: 'New Game',
    });

    this.pauseBtn = new BaseComponent({
      parentNode: gameButtonsWrapper,
      tag: 'button',
      className: 'btn btn-game-pause',
      content: 'Pause',
    });

    this.newGameButton.addListener('click', () => this.emit('newGame'));
    this.pauseBtn.addListener('click', () => this.emit('pause'));
  }

  createSettingsWrapper() {
    this.settingsWrapper = new BaseComponent({
      parentNode: this,
      className: 'settings-wrapper',
    });

    this.scoreButton = new BaseComponent({
      parentNode: this.settingsWrapper,
      className: 'settings-icon settings-icon-score',
    });

    this.soundSwitcher = new BaseComponent({
      parentNode: this.settingsWrapper,
      className: 'settings-icon settings-icon-sound',
    });

    this.themeSwitcher = new BaseComponent({
      parentNode: this.settingsWrapper,
      className: 'settings-icon settings-icon-theme',
    });

    this.changeLevelBtn = new BaseComponent({
      parentNode: this.settingsWrapper,
      className: 'settings-icon settings-icon-level',
    });

    this.themeSwitcher.toggleClass('dark', this.settings.darkTheme);
    this.soundSwitcher.toggleClass('muted', !this.settings.sounds);

    this.scoreButton.addListener('click', () => this.showScore());
    this.changeLevelBtn.addListener('click', () => this.showLevels());
    this.themeSwitcher.addListener('click', () => {
      this.settings.darkTheme = !this.settings.darkTheme;
      this.themeSwitcher.toggleClass('dark', this.settings.darkTheme);
      this.emit('changeTheme', this.settings.darkTheme);
    });
    this.soundSwitcher.addListener('click', () => {
      this.settings.sounds = !this.settings.sounds;
      this.soundSwitcher.toggleClass('muted', !this.settings.sounds);
      this.emit('changeSounds', this.settings.sounds);
    });
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
      className: 'levels',
    });
    const defaultLevels = new BaseComponent({
      parentNode: levelsWrapper,
      className: 'levels-default',
      content: '<h2 class="levels-title">Default</h2>',
    });
    const { levels } = this.settings;
    Object.keys(levels).forEach((level) => {
      const props = levels[level];
      const wrapper = new BaseComponent({
        parentNode: defaultLevels,
        className: 'level',
        content: `<h3 class="level-title">${level}</h3>`,
      });
      const levelButton = new BaseComponent({
        parentNode: wrapper,
        tag: 'button',
        className: 'btn btn-levels',
        content: `Size: ${props.rows} x ${props.cols}
        <br>Bombs: ${props.bombs}`,
      });
      levelButton.addListener('click', () => this.emit('changeLevel', props));
    });

    const customLevel = new BaseComponent({
      parentNode: levelsWrapper,
      className: 'levels-custom',
      content: '<h2 class="levels-title">Custom</h2>',
    });

    Object.keys(this.customSettings).forEach((prop) => {
      const label = new BaseComponent({
        tag: 'label',
        className: 'label',
        content: `${prop}: `,
      });
      const input = new BaseComponent({
        tag: 'input',
        className: 'input',
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
      className: 'btn btn-levels',
      content: 'Start',
    });

    customStartBtn.addListener('click', () => this.emit('changeLevel', this.customSettings));
    customLevel.append(customStartBtn);

    this.modal.content.append(levelsWrapper);
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
