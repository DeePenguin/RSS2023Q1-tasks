import { EndPoints, NewsResponse, SourcesResponse } from '../../types/types';
import { AppLoader } from './appLoader';

export class AppController extends AppLoader {
  getSources(callback: (data: SourcesResponse) => void) {
    super.getResp<SourcesResponse>(
      { endpoint: EndPoints.sources },
      callback,
    );
  }

  getNews(e: MouseEvent, callback: (data: NewsResponse) => void): boolean {
    let {target} = e;
    const sourcesContainer = e.currentTarget;

    while (target !== sourcesContainer && target instanceof HTMLElement) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (sourcesContainer instanceof HTMLElement) {
          const currentSource = sourcesContainer.getAttribute('data-source');
          if (sourceId && currentSource !== sourceId) {
            sourcesContainer.setAttribute('data-source', sourceId);
            super.getResp<NewsResponse>(
              {
                endpoint: EndPoints.everything,
                options: {
                  sources: sourceId,
                },
              },
              callback,
            );
          }
        }
        return true;
      }
      target = target.parentNode;
    }
    return false;
  }
}
