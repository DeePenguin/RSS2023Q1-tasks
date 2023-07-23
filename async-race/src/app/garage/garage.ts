import { pageLimits } from '@core/constants/page-limits'
import { PageHeader } from '@shared/components/page-header/page-header'
import { Pagination } from '@shared/components/pagination/pagination'
import { BaseComponent } from '@utils/base-component'
import { EventEmitter } from '@utils/event-emitter'
import type { PageState } from '@core/types/types'
import type { EventsMap } from '@core/models/events-map.model'
import type { CarResponse } from '@core/models/car-response.model'
import { Observer } from '@utils/observer'
import { GarageService } from '@garage/services/garage.service'
import { GarageList } from '@garage/components/garage-list/garage-list'
import { GarageControls } from '@garage/components/garage-controls/garage-controls'

export class Garage extends BaseComponent<'section'> {
  private itemsPerPage = pageLimits.garage
  private emitter = new EventEmitter<EventsMap>()
  private garageService: GarageService
  private header: PageHeader
  private pagination: Pagination
  private controls = new GarageControls(this.emitter, this.store)
  private list = new GarageList(this.emitter, this.itemsPerPage)
  private pageChanger = new Observer<number>(() => this.renderPage())

  constructor(private store: PageState) {
    super({ tag: 'section', className: 'garage' })
    this.garageService = new GarageService(this.itemsPerPage)
    this.header = new PageHeader('Garage', this.garageService.carsCount)
    this.pagination = new Pagination(this.garageService.carsCount, this.itemsPerPage, this.store.currentPage)
    this.append(this.header, this.pagination, this.controls, this.list)
    this.renderPage()
    this.store.currentPage.subscribe(this.pageChanger)
    this.emitter.on('update-store', (property: string, value: string) => {
      this.store[property] = value
    })
    this.emitter.on('request-add-car', (carProps: Omit<CarResponse, 'id'>) => {
      this.createCar(carProps)
    })
    this.emitter.on('request-update-car', (carProps: CarResponse) => {
      this.updateCar(carProps)
    })
    this.emitter.on('delete-car', (id: number) => {
      this.deleteCar(id)
    })
    this.emitter.on('request-random-cars-generation', () => {
      this.garageService.generateRandomCars()
    })
    this.emitter.on('start-car', (id: number) => {
      this.startCar(id)
    })
    this.emitter.on('drive-car', (id: number) => {
      this.driveCar(id).catch((err) => {
        console.error(err)
      })
    })
  }

  private renderPage(): void {
    const cars = this.garageService.getCars(this.store.currentPage.getValue())
    cars
      .then((carsData) => this.list.showCars(carsData))
      .catch((err) => {
        console.error(err)
      })
  }

  private createCar(carProps: Omit<CarResponse, 'id'>): void {
    const newCar = this.garageService.createCar(carProps)
    newCar
      .then((car) => this.list.addCar(car))
      .catch((err) => {
        console.error(err)
      })
  }

  private updateCar(carProps: CarResponse): void {
    this.list.updateCar(carProps)
    this.garageService.updateCar(carProps).catch((err) => {
      console.error(err)
    })
  }

  private deleteCar(id: number): void {
    this.garageService
      .deleteCar(id)
      .then(() => {
        if (!this.pagination.isLastPage()) {
          this.renderPage()
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  private startCar(id: number): void {
    this.garageService
      .startCar(id)
      .then(({ velocity, distance }) => {
        const duration = distance / velocity
        this.list.startCar(id, duration)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  private async driveCar(id: number): Promise<void> {
    try {
      const { success } = await this.garageService.driveCar(id)
      if (!success) {
        this.list.pauseCar(id)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
