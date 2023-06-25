import { BaseComponentInterface } from '../../../types/interfaces/baseComponentInterface'
import { GameData, Level } from '../../../types/types'
import { CssEditor, HtmlEditor } from './editor'

export class Game {
  private htmlEditor = new HtmlEditor()
  private cssEditor = new CssEditor()
  constructor(private gameData: GameData, private gameField: BaseComponentInterface) {
    this.gameField.append(this.cssEditor, this.htmlEditor)
    this.htmlEditor.show('<div class="markup">raz<div class="markup">inner</div></div><div class="markup">dva</div>')
    this.cssEditor.type('show answer')
  }

  public showLevel(level: Level): void {
    console.log(level)
  }
}
