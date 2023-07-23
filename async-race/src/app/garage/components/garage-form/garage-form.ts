import type { CarResponse } from '@core/models/car-response.model'
import { Button } from '@shared/components/button/button'
import { Input } from '@shared/components/input/input'
import { BaseComponent } from '@utils/base-component'

type Props = {
  carName: string
  carColor: string
  submitText: string
  cancelText?: string
  onSubmit: ({ name, color }: Record<string, string>) => void
  onTextChange?: (value: string) => void
  onColorChange?: (value: string) => void
  onCancel?: () => void
}
export class GarageForm extends BaseComponent {
  private carNameInput: Input
  private carColorInput: Input
  private submitBtn: Button
  private cancelBtn: Button | null = null

  constructor({ carName, carColor, submitText, onTextChange, onColorChange, onSubmit, onCancel }: Props) {
    super({ className: 'garage__form' })
    this.carColorInput = this.createColorInput(carColor, onColorChange)
    this.carNameInput = this.createTextInput(carName, onTextChange)
    this.submitBtn = new Button({ className: 'btn', content: submitText }, () => {
      onSubmit({ name: this.carNameInput.value, color: this.carColorInput.value })
      this.carNameInput.reset()
      this.checkValidity()
    })

    if (onCancel) {
      this.cancelBtn = new Button({ className: 'btn', content: 'Cancel' }, () => {
        onCancel()
        this.carNameInput.reset()
        this.checkValidity()
      })
    }

    this.append(this.carNameInput, this.carColorInput, this.submitBtn, this.cancelBtn ?? '')
    this.checkValidity()
  }

  private createColorInput(value: string, onColorChange?: (value: string) => void): Input {
    return new Input({
      type: 'color',
      value,
      onChange: onColorChange
        ? (): void => {
            onColorChange(this.carColorInput.value)
          }
        : undefined,
    })
  }

  private createTextInput(value: string, onTextChange?: (value: string) => void): Input {
    return new Input({
      type: 'text',
      placeholder: 'Enter car name',
      value,
      onChange: onTextChange
        ? (): void => {
            onTextChange(this.carNameInput.value)
          }
        : undefined,
      onInput: (): void => {
        this.checkValidity()
      },
    })
  }

  private checkValidity(): void {
    const isInvalid = this.carNameInput.value.length === 0
    this.submitBtn.toggleDisable(isInvalid)
  }

  public hide(): void {
    this.setStyle({ display: 'none' })
  }

  public show(isFocused?: boolean): void {
    this.setStyle({ display: 'block' })
    if (isFocused) {
      this.carNameInput.focus()
    }
  }

  public setValue(carProps: CarResponse): void {
    this.carColorInput.value = carProps.color
    this.carNameInput.value = carProps.name
    this.checkValidity()
  }
}
