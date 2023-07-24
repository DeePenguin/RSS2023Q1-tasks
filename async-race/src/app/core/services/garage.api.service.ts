import { Endpoints } from '@core/enums/endpoints'
import type { CarResponse } from '@core/models/car-response.model'
import type { CarsResponse } from '@core/models/cars-response.model'
import { httpService } from '@core/services/http-client.service'

class GarageApiService {
  private readonly endPoint = Endpoints.Garage
  private readonly http = httpService

  public async getCar(id: number): Promise<CarResponse> {
    const response = await this.http.get(this.endPoint, { url: id })
    const data = (await response.json()) as CarResponse
    return data
  }

  public async getCars(page: number, carsPerPage: number): Promise<CarsResponse> {
    const response = await this.http.get(this.endPoint, { query: { _page: page, _limit: carsPerPage } })
    const cars = (await response.json()) as CarResponse[]
    const totalCount = Number(response.headers.get('X-Total-Count')) ?? 0
    return { cars, totalCount }
  }

  public async createCar({ name, color }: Record<string, string>): Promise<CarResponse> {
    const response = await this.http.post(this.endPoint, {
      body: { name, color },
      headers: { 'Content-Type': 'application/json' },
    })
    const data = (await response.json()) as CarResponse
    return data
  }

  public async deleteCar(id: number): Promise<Record<string, never>> {
    const response = await this.http.delete(this.endPoint, { url: id })
    const data = (await response.json()) as Record<string, never>
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

export const garageApiService = new GarageApiService()
