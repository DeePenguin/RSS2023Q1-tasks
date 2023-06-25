import { BaseComponentInterface } from '../../../types/interfaces/baseComponentInterface'
import { Level } from '../../../types/types'
import { BaseComponent } from '../../../utils/base-component'
import { EventEmitter } from '../../../utils/event-emitter'
import { CssEditor, HtmlEditor } from './editor'
import './game.scss'

export class Game {
  private title = new BaseComponent({ tag: 'h2', className: 'game__title' })
  private htmlEditor = new HtmlEditor()
  private cssEditor = new CssEditor()
  constructor(private emitter: EventEmitter, private gameField: BaseComponentInterface) {
    this.gameField.append(this.title, this.cssEditor, this.htmlEditor)
    this.htmlEditor.show('<div class="markup">raz<div class="markup">inner</div></div><div class="markup">dva</div>')
    this.cssEditor.type('show answer')
  }

  public showLevel(level: Level): void {
    this.title.setContent(level.description)
    console.log(level)
  }
}
