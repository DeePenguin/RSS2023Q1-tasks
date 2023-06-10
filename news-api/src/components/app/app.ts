import { NewsResponse, SourcesResponse } from '../../types/interfaces';
import { AppController } from '../controller/controller';
import { AppView } from '../view/appView';

export class App {
  controller: AppController;

  view: AppView;

  constructor(private parent: HTMLElement, private trigger: HTMLElement) {
    this.controller = new AppController();
    this.view = new AppView(this.parent, trigger);
  }

  start() {
    const sourcesElement = this.view.getSourcesElement();
    this.controller.getSources((data: SourcesResponse) => {
      this.processSources(data);
    });

    sourcesElement.addEventListener('click', (e: MouseEvent) => {
      if (this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data)) === true) {
        this.view.toggleSources();
      }
    });

    const filtersElement = this.view.getFiltersElement();
    filtersElement.addEventListener('click', (e: MouseEvent) => {
      const filteredSources = this.controller.filterSources(e);
      this.view.drawSources(filteredSources);
    })

    this.trigger.addEventListener('click', () => this.view.toggleSources());
    }

    processSources(data: SourcesResponse) {
      const filters = this.controller.createFilters(data);
      this.view.drawFilters(filters);
      this.view.drawSources(data);
    }
}
