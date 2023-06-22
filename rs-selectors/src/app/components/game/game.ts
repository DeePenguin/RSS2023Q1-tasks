import { BaseComponentInterface } from '../../../types/interfaces/baseComponentInterface'
import { HtmlEditor } from './editor'

export class Game {
  private htmlEditor = new HtmlEditor()
  constructor(private gameField: BaseComponentInterface, private panel: BaseComponentInterface) {
    this.gameField.append(this.htmlEditor)
    this.htmlEditor.show('<div class="markup">raz<div class="markup">inner</div></div><div class="markup">dva</div>')
  }
}
