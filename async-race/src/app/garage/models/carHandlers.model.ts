import type { CarResponse } from '@core/models/car-response.model'

export type CarHandlers = {
  update: (carProps: CarResponse) => void
  delete: (id: number) => void
  start: (id: number) => void
  stop: (id: number) => void
}
