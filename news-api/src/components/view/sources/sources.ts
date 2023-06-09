import { Source } from '../../../types/types';
import { BaseComponent } from '../../../utils/baseComponent';
import './sources.css';

export class Sources {
  sourcesWrapper: HTMLElement;

  constructor(parent: HTMLElement) {
    this.sourcesWrapper = new BaseComponent({
      parent,
      className: 'sources',
    }).node;
  }

  draw(data: Source[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();

      data.forEach((source) => {
        const sourceContainer = new BaseComponent({ className: 'source__item' });
        const sourceName = new BaseComponent({
          className: 'source__item-name',
          tag: 'span',
          content: source.name,
        });

        sourceContainer.append(sourceName);
        sourceContainer.setAttributes({'data-source-id': source.id});

        fragment.append(sourceContainer.node);
      });

      this.sourcesWrapper.append(fragment);
  }
}
