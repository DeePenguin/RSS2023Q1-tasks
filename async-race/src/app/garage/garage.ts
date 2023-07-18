import { BaseComponent } from '@utils/base-component'
import { garageService } from '@core/services/garage.service'

const content = `
  <h1 class="garage__title">Garage</h1>
  <p class="not-found__subtitle">Definitely garage!</p>`

export class Garage extends BaseComponent<'section'> {
  constructor() {
    super({ tag: 'section', className: 'garage', content })
    console.log('created')
    console.log(garageService.getCars(1))
  }
}
