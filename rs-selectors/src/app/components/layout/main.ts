import { BaseComponent } from '../../../utils/base-component'

export class Main extends BaseComponent<'main'> {
  constructor(root: HTMLElement) {
    super({ tag: 'main', className: 'main', parent: root })
  }
}
