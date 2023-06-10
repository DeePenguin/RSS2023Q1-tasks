import { Source } from '../../../types/interfaces';
import { BaseComponent } from '../../../utils/baseComponent';
import './sources.css';

export class Sources {
  sourcesWrapper: HTMLElement;

  sourcesContainer: HTMLElement;

  constructor(parent: HTMLElement) {
    this.sourcesWrapper = new BaseComponent({
      parent,
      className: 'sources',
    }).node;
    this.sourcesContainer = new BaseComponent({
      parent: this.sourcesWrapper,
      className: 'sources__container',
    }).node;
  }

  draw(data: Source[]): void {
    this.sourcesContainer.innerHTML = '';
    const fragment: DocumentFragment = document.createDocumentFragment();

      data.forEach((source) => {
        const sourceElement = this.createSource(source);
        fragment.append(sourceElement);
      });

      this.sourcesContainer.append(fragment);
  }

  createSource(source: Source): HTMLElement {
    const sourceContainer = new BaseComponent({ className: 'source__item' });
    const sourceName = new BaseComponent({
      className: 'source__item-name',
      tag: 'span',
      content: source.name,
    });

    sourceContainer.append(sourceName);
    sourceContainer.setAttributes({'data-source-id': source.id});
    return sourceContainer.node;
  }

  toggle(): void {
    this.sourcesWrapper.classList.toggle('closed');
  }
}
