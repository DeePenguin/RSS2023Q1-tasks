import type { CarResponse } from '@core/models/car-response.model'

export interface CarsResponse {
  cars: CarResponse[]
  totalCount: number
}
