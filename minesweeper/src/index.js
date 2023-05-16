import Game from './components/game';
import * as page from './components/page';
import BaseComponent from './utils/base-component';

const root = new BaseComponent({
  parentNode: document.body,
  className: 'root',
});
root.append(page.header);

const game = new Game(root);
