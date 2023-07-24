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
import type { DriveStatus } from '@core/models/drive-status.model'
import { Observable } from '@utils/observable'
import { RaceState } from './enums/race-state'

export class Garage extends BaseComponent<'section'> {
  private itemsPerPage = pageLimits.garage
  private emitter = new EventEmitter<EventsMap>()
  private garageService = new GarageService(this.itemsPerPage)
  private header: PageHeader
  private pagination: Pagination
  private raceState = new Observable<RaceState>(RaceState.OnStart)
  private controls = new GarageControls(this.emitter, this.store, this.raceState)
  private list = new GarageList(this.emitter, this.raceState, this.itemsPerPage)
  private pageChanger = new Observer<number>(() => this.renderPage())

  constructor(private store: PageState) {
    super({ tag: 'section', className: 'garage' })
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
      this.startCar(id).catch((err) => {
        console.error(err)
      })
    })
    this.emitter.on('stop-car', (id: number) => {
      this.stopCar(id)
    })
    this.emitter.on('request-race', () => {
      this.startRace()
    })
    this.emitter.on('request-reset-race', () => {
      this.stopRace()
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

  private startCar(id: number): Promise<DriveStatus> {
    const promise = new Promise<DriveStatus>((resolve) => {
      this.garageService
        .startCar(id)
        .then((duration) => {
          this.list.startCar(id, duration)
          resolve(this.driveCar(id, duration))
        })
        .catch((err) => {
          console.error(err)
        })
    })
    return promise
  }

  private stopCar(id: number): void {
    this.garageService
      .stopCar(id)
      .then(() => this.list.stopCar(id))
      .catch((err) => {
        console.error(err)
      })
  }

  private driveCar(id: number, duration: number): Promise<DriveStatus> {
    const promise = new Promise<DriveStatus>((resolve, reject) => {
      this.garageService
        .driveCar(id, duration)
        .then((response) => {
          if (!response.success) {
            this.list.pauseCar(id)
            reject(response)
          }
          resolve(response)
        })
        .catch((err) => {
          console.error(err)
        })
    })
    return promise
  }

  private startRace(): void {
    this.raceState.setValue(RaceState.InProgress)
    const ids = this.list.getCars()
    const carResponses = ids.map((id) => this.startCar(id))
    Promise.any(carResponses)
      .then((car) => {
        this.addWinner({ id: car.id, time: car.duration })
      })
      .catch(() => {
        this.raceState.setValue(RaceState.OnFinish)
        console.log('all cars are broken')
      })
    Promise.allSettled(carResponses)
      .then(() => {
        this.raceState.setValue(RaceState.OnFinish)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  private stopRace(): void {
    const ids = this.list.getCars()
    ids.forEach((id) => {
      this.list.pauseCar(id)
      this.stopCar(id)
    })
    this.raceState.setValue(RaceState.OnStart)
  }

  private addWinner({ id, time }: Record<string, number>): void {
    this.garageService.addWinner({ id, time }).catch((err) => {
      console.error(err)
    })
  }
}
