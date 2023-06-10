import { NewsResponse, Source, SourcesFilter, SourcesResponse } from '../../types/interfaces';
import { Filters } from './filters/filters';
import { News } from './news/news';
import { Sources } from './sources/sources';

export class AppView {
  private news: News;

  private filters: Filters;

  private sources: Sources;

  constructor(private parent: HTMLElement, private trigger: HTMLElement) {
    this.sources = new Sources(parent);
    this.filters = new Filters(this.getSourcesElement());
    this.news = new News(parent);
  }

  drawNews(data: NewsResponse): void {
    const values = data?.articles ?? [];
    this.news.draw(values);
  }

  drawSources(data: SourcesResponse): void;
  drawSources(data: Source[]): void;
  drawSources(data: SourcesResponse| Source[]): void {
    const values = Array.isArray(data)
    ? data
    : data?.sources ?? [];
    this.sources.draw(values);
  }

  getSourcesElement(): HTMLElement {
    return this.sources.sourcesWrapper;
  }

  getFiltersElement(): HTMLElement {
    return this.filters.filtersWrapper;
  }

  toggleSources(): void {
    this.trigger.classList.toggle('closed');
    this.sources.toggle();
  }

  drawFilters(data: SourcesFilter): void {
    this.filters.draw(data);
  }
}
