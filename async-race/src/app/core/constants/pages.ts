import type { PagesRecord, PageState } from '@core/types/types'

export const pages: PagesRecord = {
  garage: async (pageState: PageState) => {
    const { Garage } = await import('@garage/garage')
    return new Garage(pageState)
  },
  winners: async (pageState: PageState) => {
    const { Winners } = await import('@winners/winners')
    return new Winners(pageState)
  },
}
