import { BaseComponent } from '../utils/base-component'
import { Layout } from './components/layout/layout'

class App {
  private root: BaseComponent = new BaseComponent({ parent: document.body, className: 'root' })
  private layout: Layout = new Layout()

  public init(): void {
    this.layout.create(this.root)
  }
}

new App().init()
