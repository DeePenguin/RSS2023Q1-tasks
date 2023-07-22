import { pageLimits } from '@core/constants/page-limits'
import { PageHeader } from '@shared/components/page-header/page-header'
import { Pagination } from '@shared/components/pagination/pagination'
import { BaseComponent } from '@utils/base-component'
import { EventEmitter } from '@utils/event-emitter'
import type { PageState } from '@core/types/types'
import type { EventsMap } from '@core/models/events-map.model'
import type { CarResponse } from '@core/models/car-response.model'
import { GarageService } from './services/garage.service'
import { GarageList } from './components/garage-list/garage-list'
import { GarageControls } from './components/garage-controls/garage-controls'

export class Garage extends BaseComponent<'section'> {
  private itemsPerPage = pageLimits.garage
  private emitter = new EventEmitter<EventsMap>()
  private garageService: GarageService
  private header: PageHeader
  private pagination: Pagination
  private controls = new GarageControls(this.emitter, this.store)
  private list = new GarageList(this.emitter)

  constructor(private store: PageState) {
    super({ tag: 'section', className: 'garage' })
    this.garageService = new GarageService(this.itemsPerPage)
    this.header = new PageHeader('Garage', this.garageService.carsCount)
    this.pagination = new Pagination(
      this.garageService.carsCount,
      this.itemsPerPage,
      this.store.currentPage,
      () => this.previousPage(),
      () => this.nextPage(),
    )
    this.append(this.header, this.pagination, this.controls, this.list)
    this.renderPage()
    this.emitter.on('update-store', (property: string, value: string) => {
      this.store[property] = value
    })
    this.emitter.on('request-add-car', (carProps: Omit<CarResponse, 'id'>) => {
      this.createCar(carProps)
    })
    this.emitter.on('request-update-car', (carProps: CarResponse) => {
      this.updateCar(carProps)
    })
  }

  private renderPage(): void {
    const cars = this.garageService.getCars(this.store.currentPage)
    cars
      .then((carsData) => this.list.showCars(carsData))
      .catch((err) => {
        console.error(err)
      })
  }

  private previousPage(): void {
    this.store.currentPage -= 1
    this.renderPage()
  }
  private nextPage(): void {
    this.store.currentPage += 1
    this.renderPage()
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
}
