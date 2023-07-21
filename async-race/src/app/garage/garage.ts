import { pageLimits } from '@core/constants/page-limits'
import { PageHeader } from '@shared/components/page-header/page-header'
import { Pagination } from '@shared/components/pagination/pagination'
import { BaseComponent } from '@utils/base-component'
import type { PageState } from '@core/types/types'
import { GarageService } from './services/garage.service'

export class Garage extends BaseComponent<'section'> {
  private itemsPerPage = pageLimits.garage
  private garageService: GarageService
  private header: PageHeader
  private pagination: Pagination
  private carsContainer = new BaseComponent({ className: 'garage__container' })

  constructor(private store: PageState) {
    super({ tag: 'section', className: 'garage' })
    this.garageService = new GarageService(this.itemsPerPage)
    this.header = new PageHeader('Garage', this.garageService.carsCount)
    this.pagination = new Pagination(
      this.garageService.carsCount,
      this.itemsPerPage,
      this.store.currentPage,
      () => this.previousPage(),
      () => this.nextPage(),
    )
    this.append(this.header, this.pagination, this.carsContainer)
    this.renderPage()
  }

  private renderPage(): void {
    const cars = this.garageService.getCars(this.store.currentPage)
    cars
      .then((carsData) => this.carsContainer.setContent(JSON.stringify(carsData)))
      .catch((err) => {
        console.error(err)
      })
  }

  private previousPage(): void {
    this.store.currentPage -= 1
    this.renderPage()
  }
  private nextPage(): void {
    this.store.currentPage += 1
    this.renderPage()
  }
}
