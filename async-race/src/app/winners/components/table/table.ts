import type { SortOrder } from '@core/enums/sort-order'
import { WinnersSortable } from '@core/enums/winners-sortable'
import { BaseComponent } from '@utils/base-component'
import type { Observable } from '@utils/observable'
import { Observer } from '@utils/observer'
import type { Winner } from '@winners/models/winner.model'
import './table.scss'

export class Table extends BaseComponent<'table'> {
  private page: number = 0
  private contentChanger = new Observer<Winner[]>((value) => this.showWinners(value))
  private pageChanger = new Observer<number>((value) => {
    this.page = (value - 1) * 10
  })
  private sortableHeaders: BaseComponent<'th'>[] = []
  private body = new BaseComponent({ tag: 'tbody', className: 'winners__tbody' })

  constructor(
    winners: Observable<Winner[]>,
    page: Observable<number>,
    sort: WinnersSortable,
    order: SortOrder,
    callBack: (sortBy: WinnersSortable) => void,
  ) {
    super({ tag: 'table', className: 'winners__table' })
    const header = this.createHeader(sort, order, callBack)
    this.append(header, this.body)
    winners.subscribe(this.contentChanger)
    page.subscribe(this.pageChanger)
  }

  private createHeader(
    sort: WinnersSortable,
    order: SortOrder,
    callBack: (sortBy: WinnersSortable) => void,
  ): BaseComponent<'thead'> {
    const sortable = Object.values(WinnersSortable) as string[]
    const columns = ['№', 'car', 'name', 'wins', 'time']
    const header = new BaseComponent({ tag: 'thead', className: 'winners__thead' })
    const tr = new BaseComponent({ parent: header, tag: 'tr', className: 'winners__tr' })
    columns.forEach((column) => {
      const th = new BaseComponent({ parent: tr, tag: 'th', className: 'winners__th', content: column })
      if (sortable.includes(column)) {
        this.sortableHeaders.push(th)
        th.addClass('winners__th--sortable')
        th.addListener('click', () => {
          this.sortableHeaders.forEach((el) => el.removeClass('winners__th--active'))
          th.addClass('winners__th--active')
          callBack(column as WinnersSortable)
        })
      }
      if (column === sort) {
        th.addClass('winners__th--active')
        th.addClass(order)
      }
    })
    return header
  }

  private showWinners(winners: Winner[]): void {
    this.body.getNode().innerHTML = ''
    winners.forEach(({ name, color, wins, time }, index) => {
      const content = `
      <td class="winners__td">${this.page + index + 1}</td>
      <td class="winners__td winners__td--center"><div class ="car__item" style="--car-color: ${color}"</td>
      <td class="winners__td winners__td--center">${name}</td>
      <td class="winners__td">${wins}</td>
      <td class="winners__td">${time}</td>
      `
      const tr = new BaseComponent({ tag: 'tr', className: 'winners__tr', content })
      this.body.append(tr)
    })
  }
}
