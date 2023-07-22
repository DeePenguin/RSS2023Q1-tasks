import type { CarResponse } from '@core/models/car-response.model'
import { BaseComponent } from '@utils/base-component'
import type { EventEmitter } from '@utils/event-emitter'
import type { EventsMap } from '@core/models/events-map.model'
import { Car } from '@garage/components/car/car'
import type { CarHandlers } from '@garage/models/carHandlers.model'
import './garage-list.scss'

export class GarageList extends BaseComponent {
  private cars: Record<string, Car> = {}
  private carHandlers: CarHandlers = {
    update: (carProps: CarResponse): void => this.updateCarHandler(carProps),
    delete: (id: number): void => this.deleteCarHandler(id),
    start: (id: number): void => this.startCarHandler(id),
    stop: (id: number): void => this.stopCarHandler(id),
  }
  constructor(private emitter: EventEmitter<EventsMap>) {
    super({ className: 'garage__list' })
  }

  private clear(): void {
    this.cars = {}
    this.node.innerHTML = ''
  }

  private updateCarHandler(carProps: CarResponse): void {
    this.emitter.emit('update-car', carProps)
  }
  private deleteCarHandler(id: number): void {
    this.emitter.emit('delete-car', id)
    this.cars[id].remove()
    delete this.cars[id]
  }
  private startCarHandler(id: number): void {
    console.log('start', id)
  }
  private stopCarHandler(id: number): void {
    console.log('stop', id)
  }

  public showCars(cars: CarResponse[]): void {
    this.clear()
    cars.forEach((carProps) => {
      const car = new Car(carProps, this.carHandlers)
      this.cars[carProps.id] = car
      this.append(car)
    })
  }

  public addCar(carProps: CarResponse): void {
    const car = new Car(carProps, this.carHandlers)
    this.cars[carProps.id] = car
    this.append(car)
  }

  public updateCar(carProps: CarResponse): void {
    this.cars[carProps.id].changeColor(carProps.color)
    this.cars[carProps.id].changeName(carProps.name)
  }
}
