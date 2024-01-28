import * as page from './components/page';
import BaseComponent from './utils/base-component';
import App from './components/app';

const root = new BaseComponent({
  parentNode: document.body,
  className: 'root',
});
root.append(page.header);
const app = new App(root);

window.addEventListener('beforeunload', () => app.saveCurrentGame());
