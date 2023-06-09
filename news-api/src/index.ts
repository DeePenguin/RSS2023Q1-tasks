import { App } from './components/app/app';
import './global.css';

const main = document.querySelector('main');
if (main) {
  const app = new App(main);
  app.start();
}
