import { NewsArticle } from '../../../types/interfaces'
import { BaseComponent } from '../../../utils/baseComponent'
import './news.css'

export class News {
  newsWrapper: HTMLElement

  constructor(parent: HTMLElement) {
    this.newsWrapper = new BaseComponent({
      parent,
      className: 'news',
    }).node
  }

  public draw(data: NewsArticle[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data

    const fragment = document.createDocumentFragment()

    news.forEach((item, idx) => {
      const newsItem = new BaseComponent({ className: 'news__item' })
      if (idx % 2) newsItem.addClass('alt')

      const metaContainer = new BaseComponent({ parent: newsItem, className: 'news__meta' })
      const metaPhoto = new BaseComponent({ parent: metaContainer, className: 'news__meta-photo' })
      if (item.urlToImage) {
        metaPhoto.style.backgroundImage = `url(${item.urlToImage})`
      }

      const metaDetails = new BaseComponent({ parent: metaContainer, tag: 'ul', className: 'news__meta-details' })
      const metaAuthor = new BaseComponent({ parent: metaDetails, tag: 'li', className: 'news__meta-author' })
      metaAuthor.setContent(item.author || item.source.name)

      const metaDate = new BaseComponent({ parent: metaDetails, tag: 'li', className: 'news__meta-date' })
      metaDate.setContent(item.publishedAt.slice(0, 10).split('-').reverse().join('-'))

      const description = new BaseComponent({ parent: newsItem, className: 'news__description' })
      const title = new BaseComponent({ tag: 'h2', className: 'news__description-title', content: item.title })
      const source = new BaseComponent({ tag: 'h3', className: 'news__description-source', content: item.source.name })
      const content = new BaseComponent({ tag: 'p', className: 'news__description-content', content: item.description })
      const readMore = new BaseComponent({
        tag: 'p',
        className: 'news__read-more',
        content: `<a href="${item.url}" target="_blank">Read more</a>`,
      })

      description.append(title, source, content, readMore)
      fragment.append(newsItem.node)
    })

    this.newsWrapper.innerHTML = ''
    this.newsWrapper.appendChild(fragment)
  }
}
