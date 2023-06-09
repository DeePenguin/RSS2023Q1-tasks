import { NewsArticle } from '../../../types/types';
import { BaseComponent } from '../../../utils/baseComponent';
import './news.css';

export class News {
  draw(data: NewsArticle[]) {
    const news = data.length >= 10
      ? data.filter((_item, idx) => idx < 10)
      : data;

    const fragment = document.createDocumentFragment();

    news.forEach((item, idx) => {
      const newsItem = new BaseComponent({className: 'news__item'});
      if (idx % 2) newsItem.addClass('alt');

      const metaContainer = new BaseComponent({parent: newsItem, className: 'news__meta'});
      const metaPhoto = new BaseComponent({className: 'news__meta-photo'});
      metaPhoto.style.backgroundImage = `url(${
          item.urlToImage || 'img/news_placeholder.jpg'
      })`;

      const metaDetails = new BaseComponent({tag: 'ul', className: 'news__meta-details'});
      const metaAuthor = new BaseComponent({parent: metaDetails, tag: 'li', className: 'news__meta-author'});
      metaAuthor.setContent(item.author || item.source.name);

      const metaDate = new BaseComponent({parent: metaDetails, tag: 'li', className: 'news__meta-date'});
      metaDate.setContent(item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-')
      );
      metaContainer.append(metaPhoto, metaDetails);

      const description = new BaseComponent({parent: newsItem, className: 'news__description'});
      const title = new BaseComponent({tag: 'h2', className: 'news__description-title', content: item.title});
      const source = new BaseComponent({tag: 'h3', className: 'news__description-source', content: item.source.name});
      const content = new BaseComponent({tag: 'p', className: 'news__description-content', content: item.description});
      const readMore = new BaseComponent({
        tag: 'p',
        className: 'news__read-more',
        content: `<a href="${item.url}">Read more</a>`,
      });

      description.append(title, source, content, readMore);

      fragment.append(newsItem.node);
    });

    const newsContainer = document.querySelector('.news');
    if (newsContainer) {
      newsContainer.innerHTML = '';
      newsContainer.appendChild(fragment);
    }
  }
}
