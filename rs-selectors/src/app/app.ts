import { GameData } from './types/types'
import { BaseComponent } from './utils/base-component/base-component'
import { EventEmitter } from './utils/event-emitter/event-emitter'
import { levels } from './core/levels'
import { Game } from './components/game/game'
import { Layout } from './components/layout/layout'
import { LevelsList } from './components/levelsList/levels-list'
import { ResetBtn } from './components/reset-btn/reset-btn'
import { Store } from './services/store/store'

class App {
  private root: BaseComponent = new BaseComponent({ parent: document.body, className: 'root' })
  private layout: Layout = new Layout(this.root)
  private storage: Store = new Store()
  private emitter = new EventEmitter()
  private resetBtn = new ResetBtn(this.emitter)
  private levels = levels
  private gameData!: GameData
  private game!: Game
  private levelsList!: LevelsList
  private isHintUsed = false
  private isFinished = false

  public init(): void {
    this.gameData = this.storage.getData()
    this.levelsList = new LevelsList(this.layout.levels, this.emitter, this.levels, this.gameData)
    this.layout.levels.append(this.resetBtn)
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
    this.emitter.on('resetProgress', () => {
      this.resetProgress()
    })
  }

  private changeLevel(index: number): void {
    if (index !== this.gameData.currentLevel || this.isFinished) {
      this.isFinished = false
      this.isHintUsed = false
      this.gameData.currentLevel = index
      this.game.showLevel(this.levels[index])
      this.levelsList.checkCurrent(index)
      this.saveData()
    }
  }

  private completeLevel(): void {
    this.updateGameData()
    this.levelsList.completeLevel(this.gameData.currentLevel, this.isHintUsed)
    if (this.gameData.currentLevel === this.levels.length - 1) {
      this.saveData()
      this.isFinished = true
      this.emitter.emit('finishGame', null)
    } else {
      this.changeLevel(this.gameData.currentLevel + 1)
    }
  }

  private handleHint(): void {
    this.isHintUsed = true
    this.gameData.finishedWithHint.add(this.gameData.currentLevel)
    this.levelsList.checkAsHinted(this.gameData.currentLevel)
    this.saveData()
  }

  private updateGameData(): void {
    const isLevelAlreadyHinted = this.gameData.finishedWithHint.has(this.gameData.currentLevel)
    this.gameData.finishedLevels.add(this.gameData.currentLevel)
    if (!this.isHintUsed && isLevelAlreadyHinted !== this.isHintUsed) {
      this.gameData.finishedWithHint.delete(this.gameData.currentLevel)
    }
  }

  private saveData(): void {
    this.storage.saveData(this.gameData)
  }

  private resetProgress(): void {
    this.gameData.finishedLevels.clear()
    this.gameData.finishedWithHint.clear()
    this.changeLevel(0)
  }
}

new App().init()
