import type { ComponentProps } from '@core/types/types'
import { BaseComponent } from '@utils/base-component'

export class Button extends BaseComponent<'button'> {
  constructor(props: Partial<Omit<ComponentProps<'button'>, 'tag'>>, onClick?: () => unknown) {
    super({ ...props, tag: 'button' })
    if (onClick) {
      this.addListener('click', onClick)
    }
  }

  public toggleDisable(isDisabled: boolean): void {
    this.node.disabled = isDisabled
  }
}
