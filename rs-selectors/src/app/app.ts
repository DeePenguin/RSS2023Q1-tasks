import { GameData } from '../types/types'
import { BaseComponent } from '../utils/base-component'
import { EventEmitter } from '../utils/event-emitter'
import { levels } from '../utils/levels'
import { Game } from './components/game/game'
import { Layout } from './components/layout/layout'
import { LevelsList } from './components/levelsList/levels-list'
import { Storage } from './storage'

class App {
  private root: BaseComponent = new BaseComponent({ parent: document.body, className: 'root' })
  private layout: Layout = new Layout()
  private storage: Storage = new Storage()
  private emitter = new EventEmitter()
  private levels = levels
  private gameData!: GameData
  private game!: Game
  private levelsList!: LevelsList

  public init(): void {
    this.layout.create(this.root)
    this.gameData = this.storage.getData()
    this.levelsList = new LevelsList(this.layout.levels, this.emitter, this.levels, this.gameData)
    console.log(this.gameData)
    this.game = new Game(this.gameData, this.layout.gameField)
    this.game.showLevel(this.levels[this.gameData.currentLevel])
  }
}

new App().init()
