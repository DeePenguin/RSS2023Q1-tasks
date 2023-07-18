import type { PagesRecord } from '@core/types/types'

export const pages: PagesRecord = {
  garage: async () => {
    const { Garage } = await import('@garage/garage')
    return new Garage()
  },
  winners: async () => {
    const { Winners } = await import('@winners/winners')
    return new Winners()
  },
}
