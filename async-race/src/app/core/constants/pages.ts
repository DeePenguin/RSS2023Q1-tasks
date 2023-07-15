import { Garage } from '@components/garage/garage'
import { Winners } from '@components/winners/winners'
import type { PagesRecord } from '@core/types/types'

export const pages: PagesRecord = {
  garage: new Garage(),
  winners: new Winners(),
}
