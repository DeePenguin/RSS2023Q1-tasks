import { BaseComponentInterface } from '../../models/base-component.model'
import { header } from './header/header'
import { levels } from './levels/levels'
import { footer } from './footer/footer'
import { gameField } from './game-field/game'
import './layout.scss'

export class Layout {
  public header = header
  public footer = footer
  public levels = levels
  public gameField = gameField

  public create(root: BaseComponentInterface): void {
    root.append(header, gameField, levels, footer)
  }
}
