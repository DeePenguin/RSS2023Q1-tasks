import hljs from 'highlight.js'
import { BaseComponent } from '../../../utils/base-component/base-component'
import 'highlight.js/styles/base16/dracula.css'

export class Editor extends BaseComponent {
  protected header = new BaseComponent({ tag: 'header', className: 'editor__header' })
  protected title = new BaseComponent({ parent: this.header, tag: 'h2', className: 'editor__title' })
  protected fileName = new BaseComponent({ parent: this.header, className: 'editor__filename' })
  protected counter = new BaseComponent({ className: 'editor__counter' })
  protected content = new BaseComponent({ className: 'editor__content' })
  protected hljs = hljs
  constructor(protected linesAmount: number = 0) {
    super({ className: 'editor' })
    this.createLinesCounter()
    this.append(this.header, this.counter, this.content)
  }

  protected createLinesCounter(): void {
    if (this.linesAmount > 0) {
      const numbers = new Array(this.linesAmount).fill(0).map((_, i) => i + 1)
      numbers.forEach((number) => this.counter.append(new BaseComponent({ tag: 'span', content: number.toString() })))
    }
  }
}
