import { NewsResponse, SourcesResponse } from '../../types/types';
import { AppController } from '../controller/controller';
import { AppView } from '../view/appView';

export class App {
  controller: AppController;

  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const sourcesElement: HTMLDivElement |  null = document.querySelector('.sources');
    if (sourcesElement) {
      this.controller.getSources((data: SourcesResponse) => {
        this.view.drawSources(data);
      });

      sourcesElement.addEventListener('click', (e: MouseEvent) => this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data)));
    }
  }
}
