import { pageLimits } from '@core/constants/page-limits'
import { PageHeader } from '@shared/components/page-header/page-header'
import { Pagination } from '@shared/components/pagination/pagination'
import { BaseComponent } from '@utils/base-component'
import type { PageState } from '@core/types/types'
import { Observer } from '@utils/observer'
import { Observable } from '@utils/observable'
import { WinnersSortable } from '@core/enums/winners-sortable'
import { SortOrder } from '@core/enums/sort-order'
import { WinnersService } from './services/winners.service'
import type { Winner } from './models/winner.model'
import { Table } from './components/table/table'

export class Winners extends BaseComponent<'section'> {
  private itemsPerPage = pageLimits.winners
  private winnersService = new WinnersService(this.itemsPerPage)
  private header: PageHeader
  private pagination: Pagination
  private pageChanger = new Observer<number>(() => this.renderPage())
  private winners = new Observable<Winner[]>([])
  private table: Table
  constructor(private store: PageState) {
    super({ tag: 'section', className: 'winners' })
    this.store.sortBy = this.store.sortBy ?? WinnersSortable.Wins
    this.store.sortOrder = this.store.sortOrder ?? SortOrder.Asc
    this.header = new PageHeader('Winners', this.winnersService.carsCount)
    this.pagination = new Pagination(this.winnersService.carsCount, this.itemsPerPage, this.store.currentPage)
    this.table = new Table(
      this.winners,
      this.store.currentPage,
      this.store.sortBy as WinnersSortable,
      this.store.sortOrder as SortOrder,
      (sortBy: WinnersSortable) => this.sort(sortBy),
    )
    this.append(this.header, this.pagination, this.table)
    this.renderPage()
    this.store.currentPage.subscribe(this.pageChanger)
  }

  private renderPage(): void {
    const response = this.winnersService.getWinners(
      this.store.currentPage.getValue(),
      this.store.sortBy as WinnersSortable,
      this.store.sortOrder as SortOrder,
    )
    response
      .then((winners) => this.winners.setValue(winners))
      .catch((err) => {
        console.error(err)
      })
  }

  private sort(sortBy: WinnersSortable): void {
    if (sortBy === this.store.sortBy) {
      this.store.sortOrder = this.store.sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc
    } else {
      this.store.sortBy = sortBy
      this.store.sortOrder = SortOrder.Asc
    }
    this.renderPage()
  }
}
