import type { CarResponse } from '@core/models/car-response.model'

export type EventsMap = {
  'update-store': (property: string, value: string) => void
  'request-add-car': (carProps: Omit<CarResponse, 'id'>) => void
  'request-update-car': (carProps: CarResponse) => void
  'request-random-cars-generation': () => void
  'update-car': (carProps: CarResponse) => void
  'delete-car': (id: number) => void
  'start-car': (id: number) => void
  'stop-car': (id: number) => void
  'request-race': () => void
}
