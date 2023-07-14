import { BaseComponent } from '@utils/base-component'
import './header.scss'

const content = `
  <h1 class="header__title">Async Race</h1>
`
export const header = new BaseComponent({ tag: 'header', className: 'header', content })
