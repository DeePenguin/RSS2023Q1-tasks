import { BaseComponent } from '../../../utils/base-component'

const content = `
  <div class= "container">
    <a class = "footer__github" target= "_blank" href="https://github.com/DeePenguin"></a>
    <p class = "footer__copy">© DeePenguin 2023</p>
    <a class = "footer__rss-logo" target= "_blank" href="https://rs.school/js/"></a>
  </div>
`

export class Footer extends BaseComponent<'footer'> {
  constructor(root: HTMLElement) {
    super({ tag: 'footer', className: 'footer', parent: root, content })
  }
}
