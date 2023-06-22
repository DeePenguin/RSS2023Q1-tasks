import { BaseComponent } from '../utils/base-component'

import { Game } from './components/game/game'
import { Layout } from './components/layout/layout'

class App {
  private root: BaseComponent = new BaseComponent({ parent: document.body, className: 'root' })
  private layout: Layout = new Layout()
  private game!: Game

  public init(): void {
    this.layout.create(this.root)
    this.game = new Game(this.layout.gameField, this.layout.panel)
  }
}

new App().init()
