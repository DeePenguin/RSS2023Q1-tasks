import EventEmitter from '../../utils/event-emitter';

import win from './audio/win.mp3';
import lose from './audio/explosion.mp3';
import click from './audio/click.mp3';
import flag from './audio/flag.mp3';

export default class Sound extends EventEmitter {
  constructor(settings) {
    super();
    this.settings = settings;
    this.win = new Audio(win);
    this.lose = new Audio(lose);
    this.click = new Audio(click);
    this.flag = new Audio(flag);
    this.on('win', () => { if (this.settings.sounds) this.win.play(); });
    this.on('lose', () => { if (this.settings.sounds) this.lose.play(); });
    this.on('move', () => { if (this.settings.sounds) this.click.play(); });
    this.on('updateFlagsCounter', () => { if (this.settings.sounds) this.flag.play(); });
  }
}
