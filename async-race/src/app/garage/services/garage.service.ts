import type { CarResponse } from '@core/models/car-response.model'
import type { DriveStatus } from '@core/models/drive-status.model'
import type { EngineResponse } from '@core/models/engine-response.model'
import { engineApiService } from '@core/services/engine.api.service'
import { garageApiService } from '@core/services/garage.api.service'
import { winnersApiService } from '@core/services/winners.service'
import { Observable } from '@utils/observable'
import { randomizer } from '@utils/randomizer'

const carsInitialCount = 0
const randomCarsAmount = 100

export class GarageService {
  private readonly garageApi = garageApiService
  private readonly winnersApi = winnersApiService
  private readonly engineApi = engineApiService
  public carsCount = new Observable<number>(carsInitialCount)

  constructor(private readonly itemsPerPage: number) {}

  public async getCars(pageNumber: number): Promise<CarResponse[]> {
    const response = await this.garageApi.getCars(pageNumber, this.itemsPerPage)
    this.carsCount.setValue(response.totalCount)
    return response.cars
  }
  public async getCar(id: number): Promise<CarResponse> {
    const response = await this.garageApi.getCar(id)
    return response
  }

  public async createCar({ name, color }: Record<string, string>): Promise<CarResponse> {
    const response = await this.garageApi.createCar({ name, color })
    this.carsCount.setValue(this.carsCount.getValue() + 1)
    return response
  }

  public async deleteCar(id: number): Promise<Record<string, never>> {
    const response = await this.garageApi.deleteCar(id)
    await this.winnersApi.deleteWinner(id)
    this.carsCount.setValue(this.carsCount.getValue() - 1)
    return response
  }

  public async updateCar({ id, name, color }: CarResponse): Promise<CarResponse> {
    const response = await this.garageApi.updateCar(id, { name, color })
    return response
  }

  public generateRandomCars(): void {
    const randomCars = Array.from({ length: randomCarsAmount }, () => ({
      name: randomizer.getName(),
      color: randomizer.getColor(),
    }))
    randomCars.map(async (car) => {
      await this.createCar(car)
    })
  }

  public async startCar(id: number): Promise<number> {
    const { velocity, distance } = await this.engineApi.startEngine(id)
    return Math.round(distance / velocity)
  }

  public async stopCar(id: number): Promise<EngineResponse> {
    const response = await this.engineApi.stopEngine(id)
    return response
  }

  public async driveCar(id: number, duration: number): Promise<DriveStatus> {
    return this.engineApi.startDrive(id, duration)
  }

  public async addWinner({ id, time }: Record<string, number>): Promise<void> {
    const currentTime = Number((time / 1000).toFixed(2))
    try {
      const winner = await this.winnersApi.getWinner(id)
      const newTime = Math.min(currentTime, winner.time)
      await this.winnersApi.updateWinner(id, { time: newTime, wins: winner.wins + 1 })
    } catch (err) {
      await this.winnersApi.createWinner({ id, time: currentTime, wins: 1 })
    }
  }
}
