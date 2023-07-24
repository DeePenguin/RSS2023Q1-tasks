import { Endpoints } from '@core/enums/endpoints'
import type { SortOrder } from '@core/enums/sort-order'
import type { WinnersSortable } from '@core/enums/winners-sortable'
import type { WinnerResponse } from '@core/models/winner-response.model'
import type { WinnersResponse } from '@core/models/winners-response.model'
import { httpService } from '@core/services/http.service'

class WinnersApiService {
  private readonly endPoint = Endpoints.Winners
  private readonly http = httpService

  public async deleteWinner(id: number): Promise<Record<string, never>> {
    const response = await this.http.delete(this.endPoint, { url: id })
    const data = (await response.json()) as Record<string, never>
    return data
  }

  public async getWinner(id: number): Promise<WinnerResponse> {
    const response = await this.http.get(this.endPoint, { url: id })
    if (response.status === 404) {
      throw new Error('Winner not found')
    }
    const data = (await response.json()) as WinnerResponse
    return data
  }

  public async getWinners(
    page: number,
    carsPerPage: number,
    sort: WinnersSortable,
    order: SortOrder,
  ): Promise<WinnersResponse> {
    const response = await this.http.get(this.endPoint, {
      query: { _page: page, _limit: carsPerPage, _sort: sort, _order: order },
    })
    const winners = (await response.json()) as WinnerResponse[]
    const totalCount = Number(response.headers.get('X-Total-Count')) ?? 0
    return { winners, totalCount }
  }

  public async createWinner(winnerProps: WinnerResponse): Promise<WinnerResponse> {
    const response = await this.http.post(this.endPoint, {
      body: winnerProps,
      headers: { 'Content-Type': 'application/json' },
    })
    const data = (await response.json()) as WinnerResponse
    return data
  }

  public async updateWinner(id: number, { wins, time }: Record<string, number>): Promise<WinnerResponse> {
    const response = await this.http.put(this.endPoint, {
      url: id,
      body: { wins, time },
      headers: { 'Content-Type': 'application/json' },
    })
    const data = (await response.json()) as WinnerResponse
    return data
  }
}

export const winnersApiService = new WinnersApiService()
