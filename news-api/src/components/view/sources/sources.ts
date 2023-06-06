import { Source } from '../../../types/types';
import { BaseComponent } from '../../../utils/baseComponent';
import './sources.css';

class Sources {
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

    const sourcesContainer: HTMLDivElement | null = document.querySelector('.sources');
    if (sourcesContainer) {
      sourcesContainer.append(fragment);
    }
  }
}

export { Sources };
