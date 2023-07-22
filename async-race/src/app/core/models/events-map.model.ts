import type { CarResponse } from '@core/models/car-response.model'

export type EventsMap = {
  'update-store': (property: string, value: string) => void
  'request-add-car': (carProps: Omit<CarResponse, 'id'>) => void
  'update-car': (id: number) => void
  'delete-car': (id: number) => void
}
