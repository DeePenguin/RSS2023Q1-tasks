import { BaseComponentInterface } from '../../../types/interfaces/baseComponentInterface'
import { header } from './header/header'
import { panel } from './panel/panel'
import { footer } from './footer/footer'
import { gameField } from './game-field/game-field'
import './layout.scss'

export class Layout {
  public header = header
  public footer = footer
  public panel = panel
  public gameField = gameField

  public create(root: BaseComponentInterface): void {
    root.append(header, gameField, panel, footer)
  }
}
