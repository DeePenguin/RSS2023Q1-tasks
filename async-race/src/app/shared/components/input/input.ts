import type { ComponentProps } from '@core/types/types'
import { BaseComponent } from '@utils/base-component'

type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

type InputComponentProps = Partial<Omit<ComponentProps<'input'>, 'tag'>> & {
  type: InputType
  placeholder?: string
  value?: number | string
  onChange?: (value: string) => void
  onInput?: (value: string) => void
}

export class Input extends BaseComponent<'input'> {
  constructor(props: InputComponentProps) {
    super({ ...props, tag: 'input' })
    const { type, placeholder = '', value = '', onChange, onInput } = props
    this.setAttributes({ type, placeholder, value: value.toString() })
    if (onChange) {
      this.addListener('change', () => onChange(this.value))
    }
    if (onInput) {
      this.addListener('input', () => onInput(this.value))
    }
  }

  public get value(): string {
    return this.node.value
  }

  public set value(value: string | number) {
    this.node.value = value.toString()
  }

  public reset(): void {
    this.node.value = ''
  }

  public focus(): void {
    this.node.focus()
  }
}
