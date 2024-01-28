import type { WinnerResponse } from '@core/models/winner-response.model'

export type WinnersResponse = {
  winners: WinnerResponse[]
  totalCount: number
}
