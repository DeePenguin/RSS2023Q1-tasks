import type { ComponentProps } from '@core/types/types'
import { BaseComponent } from '@utils/base-component'

export class ObserverComponent<ObservableType, T extends keyof HTMLElementTagNameMap = 'div'> extends BaseComponent<T> {
  public update: (value: ObservableType) => void
  constructor(onUpdate: (value: ObservableType) => void, props: Partial<ComponentProps<T>>) {
    super(props)
    this.update = onUpdate
  }
}
