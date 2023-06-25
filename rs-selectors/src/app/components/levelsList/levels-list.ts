import { BaseComponentInterface } from '../../../types/interfaces/baseComponentInterface'
import { GameData, Level } from '../../../types/types'
import { BaseComponent } from '../../../utils/base-component'
import { EventEmitter } from '../../../utils/event-emitter'
import './levels-list.scss'

export class LevelsList extends BaseComponent<'ul'> {
  constructor(
    root: HTMLElement | BaseComponentInterface,
    private emitter: EventEmitter,
    levels: Level[],
    gameData: GameData,
    private listItems: BaseComponentInterface[] = [],
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
        content: `<span class="level__number">${ind + 1}</span> ${level.title}`,
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

  public checkAsCompleted(number: number): void {
    this.listItems[number].addClass('completed')
  }

  public checkAsHinted(number: number): void {
    this.listItems[number].addClass('hinted')
  }

  public checkCurrent(number: number): void {
    this.listItems.forEach((item) => item.removeClass('current'))
    this.listItems[number].addClass('current')
  }

  public reset(): void {
    this.listItems.forEach((item) => item.removeClass('completed', 'hinted'))
  }
}
