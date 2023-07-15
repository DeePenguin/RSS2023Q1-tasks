import { BaseComponent } from '@utils/base-component'

const content = `
  <h1 class="garage__title">Winners</h1>
  <p class="not-found__subtitle">Definitely Winners!</p>`

export class Winners extends BaseComponent<'section'> {
  constructor() {
    super({ tag: 'section', className: 'winners', content })
  }
}
