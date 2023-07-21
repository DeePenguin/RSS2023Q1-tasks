import { BaseComponent } from '@utils/base-component'
import './car.scss'

export class Car extends BaseComponent {
  constructor(color: string) {
    super({ className: 'car__item' })
    this.setStyle({ backgroundColor: color })
  }

  public changeColor(color: string): void {
    this.setStyle({ backgroundColor: color })
  }
}
