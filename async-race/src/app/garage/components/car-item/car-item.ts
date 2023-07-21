import { BaseComponent } from '@utils/base-component'
import './car-item.scss'

export class CarItem extends BaseComponent {
  constructor(color: string) {
    super({ className: 'car__item' })
    this.setStyle({ '--car-color': color })
  }

  public changeColor(color: string): void {
    this.setStyle({ '--car-color': color })
  }
}
