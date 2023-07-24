import type { SortOrder } from '@core/enums/sort-order'
import type { WinnersSortable } from '@core/enums/winners-sortable'
import { garageApiService } from '@core/services/garage.api.service'
import { winnersApiService } from '@core/services/winners.service'
import { Observable } from '@utils/observable'
import type { Winner } from '@winners/models/winner.model'

const carsInitialCount = 0

export class WinnersService {
  private readonly garageApi = garageApiService
  private readonly winnersApi = winnersApiService
  public carsCount = new Observable<number>(carsInitialCount)

  constructor(private readonly itemsPerPage: number) {}

  public async getWinners(pageNumber: number, sort: WinnersSortable, order: SortOrder): Promise<Winner[]> {
    const response = await this.winnersApi.getWinners(pageNumber, this.itemsPerPage, sort, order)
    this.carsCount.setValue(response.totalCount)
    const data = []
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of response.winners) {
      const { color, name } = await this.garageApi.getCar(item.id)
      data.push({ ...item, color, name })
    }
    return data
  }
}
