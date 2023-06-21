import { BaseComponent } from '../../../utils/base-component'
import { header } from './header/header'
import { panel } from './panel/panel'
import { footer } from './footer/footer'
import { gameField } from './game-field/game-field'
import './layout.scss'

export class Layout {
  public header: BaseComponent<'header'> = header
  public footer: BaseComponent<'footer'> = footer
  public panel: BaseComponent<'section'> = panel
  public gameField: BaseComponent<'section'> = gameField

  public create(root: BaseComponent): void {
    root.append(header, gameField, panel, footer)
  }
}
