import type { PagesRecord } from '@core/types/types'
import { Garage } from '@garage/garage'
import { Winners } from '@winners/winners'

export const pages: PagesRecord = {
  garage: new Garage(),
  winners: new Winners(),
}
