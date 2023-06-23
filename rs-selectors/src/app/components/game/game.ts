import { BaseComponentInterface } from '../../../types/interfaces/baseComponentInterface'
import { CssEditor, HtmlEditor } from './editor'

export class Game {
  private htmlEditor = new HtmlEditor()
  private cssEditor = new CssEditor()
  constructor(private gameField: BaseComponentInterface, private panel: BaseComponentInterface) {
    this.gameField.append(this.cssEditor, this.htmlEditor)
    this.htmlEditor.show('<div class="markup">raz<div class="markup">inner</div></div><div class="markup">dva</div>')
    this.cssEditor.type('show answer')
  }
}
