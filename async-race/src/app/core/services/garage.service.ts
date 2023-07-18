import { Endpoints } from '@core/enums/endpoints'
import type { CarResponse } from '@core/models/carResponse.model'
import { pageLimits } from '@core/constants/page-limits'
import { Observable } from '@utils/observable'
import { httpService } from './http.service'

const carsInitialCount = 0

class GarageService {
  private readonly endPoint = Endpoints.Garage
  private readonly http = httpService
  private carsCount = new Observable<number>(carsInitialCount)

  public async getCar(id: number): Promise<CarResponse> {
    const response = await this.http.get(this.endPoint, { url: id })
    const data = (await response.json()) as CarResponse
    return data
  }

  public async getCars(page: number, carsPerPage: number = pageLimits.garage): Promise<CarResponse[]> {
    const response = await this.http.get(this.endPoint, { query: { _page: page, _limit: carsPerPage } })
    const data = (await response.json()) as CarResponse[]
    this.carsCount.setValue(Number(response.headers.get('X-Total-Count')) ?? 0)
    return data
  }

  public async createCar({ name, color }: Record<string, string>): Promise<CarResponse> {
    const response = await this.http.post(this.endPoint, {
      body: { name, color },
      headers: { 'Content-Type': 'application/json' },
    })
    const data = (await response.json()) as CarResponse
    this.carsCount.setValue(this.carsCount.getValue() + 1)
    return data
  }

  public async deleteCar(id: number): Promise<Record<string, never>> {
    const response = await this.http.delete(this.endPoint, { url: id })
    const data = (await response.json()) as Record<string, never>
    this.carsCount.setValue(this.carsCount.getValue() - 1)
    return data
  }

  public async updateCar(id: number, { name, color }: Record<string, string>): Promise<CarResponse> {
    const response = await this.http.put(this.endPoint, {
      url: id,
      body: { name, color },
      headers: { 'Content-Type': 'application/json' },
    })
    const data = (await response.json()) as CarResponse
    return data
  }
}

export const garageService = new GarageService()
