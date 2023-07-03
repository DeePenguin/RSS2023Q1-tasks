import { BaseComponentInterface } from '../../models/base-component.model'
import { GameData, Level } from '../../types/types'
import { BaseComponent } from '../../utils/base-component/base-component'
import { EventEmitter } from '../../utils/event-emitter/event-emitter'
import './levels-list.scss'

export class LevelsList extends BaseComponent<'ul'> {
  private listItems: BaseComponentInterface[] = []
  constructor(
    root: HTMLElement | BaseComponentInterface,
    private emitter: EventEmitter,
    levels: Level[],
    gameData: GameData,
  ) {
    super({ parent: root, tag: 'ul', className: 'levels-list' })
    this.createList(levels, gameData)
    this.emitter.on('resetProgress', () => {
      this.reset()
    })
  }

  private createList(levels: Level[], gameData: GameData): void {
    levels.forEach((level, ind) => {
      const item = new BaseComponent<'li'>({
        parent: this,
        tag: 'li',
        className: 'level__item',
        content: `<span class="level__number">${ind + 1}</span>
        <span class="level__title">${level.title}</span>`,
      })
      item.addListener('click', () => {
        this.emitter.emit('selectLevel', this.listItems.indexOf(item))
      })
      this.listItems.push(item)
    })

    this.checkCurrent(gameData.currentLevel)
    gameData.finishedLevels.forEach((level) => {
      this.checkAsCompleted(level)
    })
    gameData.finishedWithHint.forEach((level) => {
      this.checkAsHinted(level)
    })
  }

  public checkAsCompleted(level: number): void {
    this.listItems[level].addClass('completed')
  }

  public checkAsHinted(level: number): void {
    this.listItems[level].addClass('hinted')
  }

  public removeHint(level: number): void {
    this.listItems[level].removeClass('hinted')
  }

  public checkCurrent(level: number): void {
    this.listItems.forEach((item) => item.removeClass('current'))
    this.listItems[level].addClass('current')
  }

  public reset(): void {
    this.listItems.forEach((item) => item.removeClass('completed', 'hinted'))
  }

  public completeLevel(level: number, isHintUsed: boolean): void {
    this.checkAsCompleted(level)
    if (!isHintUsed) {
      this.removeHint(level)
    }
  }
}
