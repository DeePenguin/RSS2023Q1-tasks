import type { EventsMap } from '@core/models/events-map.model'
import { Button } from '@shared/components/button/button'
import { BaseComponent } from '@utils/base-component'
import type { EventEmitter } from '@utils/event-emitter'
import { GarageForm } from '../garage-form/garage-form'

export class GarageControls extends BaseComponent {
  private startRaceBtn = new Button({ className: 'btn', content: 'Start Race' })
  private stopRaceBtn = new Button({ className: 'btn', content: 'Reset' })
  private generateRandomCarsBtn = new Button({
    className: 'btn',
    content: 'Generate 100 random cars',
  })
  private createCarForm: GarageForm

  constructor(
    private emitter: EventEmitter<EventsMap>,
    { carName = '', carColor = '' }: Record<string, string | number>,
  ) {
    super({ className: 'garage__controls' })
    this.createCarForm = new GarageForm({
      carName: carName as string,
      carColor: carColor as string,
      placeholder: 'Enter car name',
      onTextChange: (value: string): void => this.emitter.emit('update-store', 'carName', value),
      onColorChange: (value: string): void => this.emitter.emit('update-store', 'carColor', value),
      onBtnClick: ({ name, color }: Record<string, string>): void =>
        this.emitter.emit('request-add-car', { name, color }),
    })
    this.append(this.createCarForm, this.generateRandomCarsBtn, this.startRaceBtn, this.stopRaceBtn)
  }
}
