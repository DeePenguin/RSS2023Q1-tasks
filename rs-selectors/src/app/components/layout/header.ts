import { BaseComponent } from '../../../utils/base-component'

const content = '<h1 class = "header__title">RS-Selectors</h1>'

export class Header extends BaseComponent<'header'> {
  constructor(root: HTMLElement) {
    super({ tag: 'header', className: 'header', parent: root, content })
  }
}
