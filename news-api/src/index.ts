import { App } from './components/app/app';
import './global.css';

const main = document.querySelector('main');
const trigger = document.querySelector('.sources-trigger') as HTMLElement;
if (main && trigger) {
  const app = new App(main, trigger);
  app.start();
}
