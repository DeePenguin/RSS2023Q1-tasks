import { SourcesCategories, SourcesCountries, SourcesFilter, SourcesLanguages } from '../../../types/types';
import { BaseComponent } from '../../../utils/baseComponent';
import './filters.css';

export class Filters {
  filtersWrapper: HTMLElement;

  dictionary: Record<string, Record<string, string>>;

  constructor(private parent: HTMLElement) {
    const filtersEl = new BaseComponent({
      parent,
      className: 'sources__filters filters',
      content: '<h3 class="filters__title">Filters</h3>',
    })
    this.filtersWrapper = new BaseComponent({
      parent: filtersEl,
      className: 'filters__wrapper',
    }).node;

    this.dictionary = {
      language : SourcesLanguages,
      country: SourcesCountries,
      category: SourcesCategories,
    }
  }

  draw(data: SourcesFilter) {
    Object.keys(data).forEach((key) => {
      const container = new BaseComponent({
        parent: this.filtersWrapper,
        className: 'filters__item',
        content: `<div class="filters__item-name">${key}</div>`,
      });
      const values = new BaseComponent({
        parent: container,
        className: 'filters__item-values',
      });

      Object.keys(data[key]).forEach((value) => {
        values.append(this.createLabel(key, value));
      })
    });
  }

  createLabel(key: string,value: string): HTMLElement {
    const label = new BaseComponent({
      className: 'filters__item-label',
      tag: 'label',
      content: `<input type="checkbox" class="filters__item-checkbox" value ="${value}">${this.dictionary[key][value]}`,
    });
    return label.node;
  }
}
