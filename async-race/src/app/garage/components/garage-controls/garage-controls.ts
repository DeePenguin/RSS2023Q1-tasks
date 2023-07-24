import type { EventsMap } from '@core/models/events-map.model'
import { Button } from '@shared/components/button/button'
import { BaseComponent } from '@utils/base-component'
import type { EventEmitter } from '@utils/event-emitter'
import type { CarResponse } from '@core/models/car-response.model'
import { GarageForm } from '@garage/components/garage-form/garage-form'
import type { PageState } from '@core/types/types'

export class GarageControls extends BaseComponent {
  private startRaceBtn = new Button({ className: 'btn', content: 'Start Race' }, () =>
    this.emitter.emit('request-race'),
  )
  private stopRaceBtn = new Button({ className: 'btn', content: 'Reset' })
  private generateRandomCarsBtn = new Button(
    {
      className: 'btn',
      content: 'Generate random cars',
    },
    () => this.emitter.emit('request-random-cars-generation'),
  )
  private createCarForm: GarageForm
  private updateCarForm: GarageForm
  private selectedCarId: number | null = null

  constructor(private emitter: EventEmitter<EventsMap>, { carName = '', carColor = '' }: PageState) {
    super({ className: 'garage__controls' })
    this.createCarForm = new GarageForm({
      carName: carName as string,
      carColor: carColor as string,
      submitText: 'Create',
      onTextChange: (value: string): void => this.emitter.emit('update-store', 'carName', value),
      onColorChange: (value: string): void => this.emitter.emit('update-store', 'carColor', value),
      onSubmit: ({ name, color }: Record<string, string>): void =>
        this.emitter.emit('request-add-car', { name, color }),
    })

    this.updateCarForm = new GarageForm({
      carName: '',
      carColor: '',
      submitText: 'Update',
      cancelText: 'Cancel',
      onSubmit: ({ name, color }: Record<string, string>): void => {
        this.emitter.emit('request-update-car', { id: this.selectedCarId as number, name, color })
        this.createCarForm.show()
        this.updateCarForm.hide()
        this.selectedCarId = null
      },
      onCancel: (): void => {
        this.createCarForm.show()
        this.updateCarForm.hide()
        this.selectedCarId = null
      },
    })

    this.append(this.createCarForm, this.updateCarForm, this.generateRandomCarsBtn, this.startRaceBtn, this.stopRaceBtn)
    this.updateCarForm.hide()

    this.emitter.on('update-car', (carProps: CarResponse) => {
      this.updateCar(carProps)
    })
  }

  private updateCar(carProps: CarResponse): void {
    this.selectedCarId = carProps.id
    this.updateCarForm.setValue(carProps)
    this.createCarForm.hide()
    this.updateCarForm.show(true)
  }
}
