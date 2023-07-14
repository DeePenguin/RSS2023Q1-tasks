import { BaseComponent } from '@utils/base-component'
import { header } from './components/header/header'
import { footer } from './components/footer/footer'

export class App extends BaseComponent {
  private header = header
  private footer = footer
  private main = new BaseComponent({ tag: 'main', className: 'main' })
  constructor() {
    super({ className: 'root', parent: document.body })
    this.append(this.header, this.main, this.footer)
  }

  public run(): void {
    // console.log('run')
  }
}
