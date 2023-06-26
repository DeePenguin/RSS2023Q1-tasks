import { BaseComponentInterface } from '../../../types/interfaces/baseComponentInterface'
import { Level } from '../../../types/types'
import { BaseComponent } from '../../../utils/base-component'
import { EventEmitter } from '../../../utils/event-emitter'
import { CssEditor, HtmlEditor } from './editor'
import './game.scss'
import { Viewer } from './viewer/viewer'

export class Game {
  private title = new BaseComponent({ tag: 'h2', className: 'game__title' })
  private viewer = new Viewer()
  private htmlEditor = new HtmlEditor()
  private cssEditor = new CssEditor()
  constructor(private emitter: EventEmitter, private gameField: BaseComponentInterface) {
    this.gameField.append(this.title, this.viewer, this.cssEditor, this.htmlEditor)
  }

  public showLevel(level: Level): void {
    this.title.setContent(level.description)
    this.viewer.showLevel(level.elements)
  }
}
