import { BaseComponent } from '@utils/base-component'

const content = `
  <h1 class="garage__title">Garage</h1>
  <p class="not-found__subtitle">Definitely garage!</p>`

export class Garage extends BaseComponent<'section'> {
  constructor() {
    super({ tag: 'section', className: 'garage', content })
  }
}
