import type { CarResponse } from '@core/models/car-response.model'
import { garageApiService } from '@core/services/garage.api.service'
import { Observable } from '@utils/observable'

const carsInitialCount = 0

export class GarageService {
  private readonly garageApi = garageApiService
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
    this.carsCount.setValue(this.carsCount.getValue() - 1)
    return response
  }

  public async updateCar(id: number, { name, color }: Record<string, string>): Promise<CarResponse> {
    const response = await this.garageApi.updateCar(id, { name, color })
    return response
  }
}
