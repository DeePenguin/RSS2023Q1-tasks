import { BaseComponent } from '@utils/base-component'
import type { Observable } from '@utils/observable'
import { ObserverComponent } from '@utils/observer-component'
import './page-header.scss'

export class PageHeader extends BaseComponent<'header'> {
  private header: BaseComponent<'h1'>
  private counter: ObserverComponent<number>
  constructor(content: string, totalAmount: Observable<number>) {
    super({ tag: 'header', className: 'page-header' })
    this.header = new BaseComponent({ parent: this, tag: 'h1', className: 'page-header__title', content })
    this.counter = new ObserverComponent<number>((value) => this.counter.setContent(`(${value})`), {
      parent: this,
      className: 'page-header__counter',
    })
    totalAmount.subscribe(this.counter)
  }
}
