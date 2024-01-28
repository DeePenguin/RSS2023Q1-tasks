import { BaseComponent } from '@utils/base-component'
import './not-found.scss'

const content = `
  <h1 class="not-found__title">404</h1>
  <p class="not-found__subtitle">Page not found <br>T_T</p>`

export class NotFound extends BaseComponent<'section'> {
  constructor() {
    super({ tag: 'section', className: 'not-found', content })
  }
}
