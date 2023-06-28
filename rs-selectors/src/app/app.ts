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
  private hintWasUsed = false

  public init(): void {
    this.layout.create(this.root)
    this.gameData = this.storage.getData()
    this.levelsList = new LevelsList(this.layout.levels, this.emitter, this.levels, this.gameData)
    console.log(this.gameData)
    this.game = new Game(this.emitter, this.layout.gameField)
    this.game.showLevel(this.levels[this.gameData.currentLevel])
    this.emitter.on('selectLevel', (index: number) => {
      this.changeLevel(index)
    })
    this.emitter.on('hint', () => {
      this.handleHint()
    })
    this.emitter.on('completeLevel', () => {
      this.completeLevel()
    })
  }

  private changeLevel(index: number): void {
    if (index !== this.gameData.currentLevel) {
      this.hintWasUsed = false
      this.gameData.currentLevel = index
      this.game.showLevel(this.levels[index])
      this.levelsList.checkCurrent(index)
    }
  }

  private completeLevel(): void {
    this.updateGameData()
    this.levelsList.completeLevel(this.gameData.currentLevel, this.hintWasUsed)
    if (this.gameData.currentLevel === this.levels.length - 1) {
      this.finishGame()
    } else {
      this.changeLevel(this.gameData.currentLevel + 1)
    }
  }

  private handleHint(): void {
    this.hintWasUsed = true
  }

  private updateGameData(): void {
    const isLevelAlreadyFinished = this.gameData.finishedLevels.has(this.gameData.currentLevel)
    const isLevelAlreadyHinted = this.gameData.finishedWithHint.has(this.gameData.currentLevel)
    if (!isLevelAlreadyFinished) {
      this.gameData.finishedLevels.add(this.gameData.currentLevel)
    }
    if (isLevelAlreadyHinted !== this.hintWasUsed) {
      if (this.hintWasUsed) {
        this.gameData.finishedWithHint.add(this.gameData.currentLevel)
      } else {
        this.gameData.finishedWithHint.delete(this.gameData.currentLevel)
      }
    }
  }

  private finishGame(): void {
    console.log('finish')
  }
}

new App().init()
