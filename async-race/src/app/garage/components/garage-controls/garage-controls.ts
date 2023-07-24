import type { EventsMap } from '@core/models/events-map.model'
import { Button } from '@shared/components/button/button'
import { BaseComponent } from '@utils/base-component'
import type { EventEmitter } from '@utils/event-emitter'
import type { CarResponse } from '@core/models/car-response.model'
import { GarageForm } from '@garage/components/garage-form/garage-form'
import type { PageState } from '@core/types/types'
import type { Observable } from '@utils/observable'
import { Observer } from '@utils/observer'
import { RaceState } from '@garage/enums/race-state'

export class GarageControls extends BaseComponent {
  private lastActiveForm!: GarageForm
  private startRaceBtn = new Button({ className: 'btn', content: 'Start Race' }, () =>
    this.emitter.emit('request-race'),
  )
  private stopRaceBtn = new Button({ className: 'btn', content: 'Reset' }, () =>
    this.emitter.emit('request-reset-race'),
  )
  private generateRandomCarsBtn = new Button(
    {
      className: 'btn',
      content: 'Generate random cars',
    },
    () => this.emitter.emit('request-random-cars-generation'),
  )
  private createCarForm!: GarageForm
  private updateCarForm!: GarageForm
  private selectedCarId: number | null = null
  private raceObserver = new Observer<RaceState>((value) => {
    this.raceHandler(value)
  })

  constructor(
    private emitter: EventEmitter<EventsMap>,
    { carName = '', carColor = '' }: PageState,
    isRaceActive: Observable<RaceState>,
  ) {
    super({ className: 'garage__controls' })
    isRaceActive.subscribe(this.raceObserver)
    this.createForms(carName as string, carColor as string)
    this.append(this.createCarForm, this.updateCarForm, this.generateRandomCarsBtn, this.startRaceBtn, this.stopRaceBtn)
    this.updateCarForm.hide()
    this.lastActiveForm = this.createCarForm
    this.stopRaceBtn.toggleDisable(true)
    this.emitter.on('update-car', (carProps: CarResponse) => {
      this.updateCar(carProps)
    })
  }

  private createForms(carName: string, carColor: string): void {
    this.createCarForm = new GarageForm({
      carName,
      carColor,
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
        this.lastActiveForm = this.createCarForm
        this.selectedCarId = null
      },
      onCancel: (): void => {
        this.createCarForm.show()
        this.updateCarForm.hide()
        this.selectedCarId = null
      },
    })
  }

  private updateCar(carProps: CarResponse): void {
    this.selectedCarId = carProps.id
    this.updateCarForm.setValue(carProps)
    this.createCarForm.hide()
    this.updateCarForm.show(true)
    this.lastActiveForm = this.updateCarForm
  }

  private raceHandler(state: RaceState): void {
    console.log(state)
    switch (state) {
      case RaceState.OnStart:
        this.stopRaceBtn.toggleDisable(true)
        this.startRaceBtn.toggleDisable(false)
        break
      case RaceState.InProgress:
        this.startRaceBtn.toggleDisable(true)
        this.stopRaceBtn.toggleDisable(false)
        this.generateRandomCarsBtn.toggleDisable(true)
        this.lastActiveForm.hide()
        break
      case RaceState.OnFinish:
        this.lastActiveForm.show()
        this.generateRandomCarsBtn.toggleDisable(false)
        break
      default:
        break
    }
  }
}
