import Game from './components/game';
import * as page from './components/page';
import Settings from './components/settings';
import BaseComponent from './utils/base-component';

const root = new BaseComponent({
  parentNode: document.body,
  className: 'root',
});
root.append(page.header);
const settings = new Settings(root);

const game = new Game(root);

window.addEventListener('DOMContentLoaded', () => console.log('load'));
window.addEventListener('beforeunload', () => console.log('beforeunload'));
