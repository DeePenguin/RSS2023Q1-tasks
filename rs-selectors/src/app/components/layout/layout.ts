import { BaseComponentInterface } from '../../models/base-component.model'
import { BaseComponent } from '../../utils/base-component/base-component'
import { header } from './header/header'
import { levels } from './levels/levels'
import { footer } from './footer/footer'
import { gameField } from './game-field/game'
import './layout.scss'

const buttonContent = '<div class ="bar"></div>'.repeat(3)

export class Layout {
  public header = header
  public footer = footer
  public levels = levels
  public gameField = gameField

  constructor(root: BaseComponentInterface) {
    root.append(header, gameField, levels, footer)
    const overlay = new BaseComponent({ parent: root, className: 'overlay' })

    const toggleButton = new BaseComponent({
      parent: levels,
      className: 'levels__burger',
      content: buttonContent,
    })

    toggleButton.addListener('pointerdown', () => {
      toggleButton.toggleClass('open')
      levels.toggleClass('open')
      overlay.toggleClass('active')
    })

    overlay.addListener('pointerdown', () => {
      toggleButton.removeClass('open')
      levels.removeClass('open')
      overlay.removeClass('active')
    })
  }
}
