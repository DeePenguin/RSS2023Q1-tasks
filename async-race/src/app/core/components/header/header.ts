import { BaseComponent } from '@utils/base-component'
import './header.scss'
import type { PagesRecord } from '@core/types/types'

const content = `
  <h1 class="header__title">Async Race</h1>
`
export class Header extends BaseComponent<'header'> {
  private nav = new BaseComponent({ parent: this, tag: 'nav', className: 'header__nav' })
  constructor(pages: PagesRecord) {
    super({ tag: 'header', className: 'header', content })
    this.createNavigation(pages)
  }

  private createNavigation(pages: PagesRecord): void {
    const list = new BaseComponent({ parent: this.nav, tag: 'ul', className: 'nav__list' })
    Object.entries(pages).forEach(([hash]) => {
      list.append(
        new BaseComponent({
          tag: 'li',
          className: 'nav__item',
          content: `<a class='nav__link' id="${hash}" href="#${hash}">${hash}</a>`,
        }),
      )
    })
  }
}
