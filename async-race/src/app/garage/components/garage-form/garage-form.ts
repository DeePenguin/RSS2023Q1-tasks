import type { CarResponse } from '@core/models/car-response.model'
import { Button } from '@shared/components/button/button'
import { Input } from '@shared/components/input/input'
import { BaseComponent } from '@utils/base-component'

type Props = {
  carName: string
  carColor: string
  placeholder: string
  btnText: string
  onTextChange?: (value: string) => void
  onColorChange?: (value: string) => void
  onBtnClick: ({ name, color }: Record<string, string>) => void
}
export class GarageForm extends BaseComponent {
  private carNameInput: Input
  private carColorInput: Input
  private submitBtn: Button

  constructor({ carName, carColor, placeholder, btnText, onTextChange, onColorChange, onBtnClick }: Props) {
    super({ className: 'garage__form' })
    this.carColorInput = new Input({
      type: 'color',
      value: carColor,
      onChange: onColorChange
        ? (): void => {
            onColorChange(this.carColorInput.value)
          }
        : undefined,
    })
    this.carNameInput = new Input({
      type: 'text',
      placeholder,
      value: carName,
      onChange: onTextChange
        ? (): void => {
            this.checkValidity()
            onTextChange(this.carNameInput.value)
          }
        : (): void => this.checkValidity(),
    })
    this.submitBtn = new Button({ className: 'btn', content: btnText }, () => {
      onBtnClick({ name: this.carNameInput.value, color: this.carColorInput.value })
      this.carNameInput.reset()
      this.checkValidity()
    })
    this.append(this.carNameInput, this.carColorInput, this.submitBtn)
    this.checkValidity()
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
