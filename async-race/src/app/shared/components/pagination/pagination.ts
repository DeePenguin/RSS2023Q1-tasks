import { BaseComponent } from '@utils/base-component'
import type { Observable } from '@utils/observable'
import { ObserverComponent } from '@utils/observer-component'
import './pagination.scss'
import { Button } from '../button/button'

export class Pagination extends ObserverComponent<number, 'div'> {
  private pagesAmount!: number
  private previousBtn: Button
  private nextBtn: Button
  private counterElement = new BaseComponent({
    className: 'pagination__counter',
  })

  constructor(
    private totalCarsCount: Observable<number>,
    private readonly itemsPerPage: number,
    private currentPage: Observable<number>,
  ) {
    super((totalCount) => this.updatePagesAmount(totalCount), { className: 'pagination' })
    this.totalCarsCount.subscribe(this)
    this.previousBtn = new Button(
      {
        className: 'pagination__btn pagination__btn--previous',
        content: '&lt;',
      },
      () => {
        this.changePage(this.currentPage.getValue() - 1)
      },
    )

    this.nextBtn = new Button(
      {
        className: 'pagination__btn pagination__btn--next',
        content: '&gt;',
      },
      () => {
        this.changePage(this.currentPage.getValue() + 1)
      },
    )
    this.append(this.previousBtn, this.counterElement, this.nextBtn)
  }

  private updatePagesAmount(totalCount: number): void {
    this.pagesAmount = Math.ceil(totalCount / this.itemsPerPage)
    if (this.currentPage.getValue() > this.pagesAmount) {
      this.currentPage.setValue(this.pagesAmount)
    }
    this.updateCounterElement()
    this.toggleButtonsDisability()
  }

  private toggleButtonsDisability(): void {
    const isFirstPage = this.currentPage.getValue() === 1
    const isLastPage = this.currentPage.getValue() === this.pagesAmount
    this.previousBtn.toggleDisable(isFirstPage)
    this.nextBtn.toggleDisable(isLastPage)
  }

  private changePage(pageNumber: number): void {
    this.currentPage.setValue(pageNumber)
    this.updateCounterElement()
    this.toggleButtonsDisability()
  }

  private updateCounterElement(): void {
    this.counterElement.setContent(`Page ${this.currentPage.getValue()} / ${this.pagesAmount}`)
  }

  public isLastPage(): boolean {
    return this.currentPage.getValue() === this.pagesAmount
  }

  public lockButtons(isLocked: boolean): void {
    if (!isLocked) {
      this.toggleButtonsDisability()
      return
    }
    this.previousBtn.toggleDisable(isLocked)
    this.nextBtn.toggleDisable(isLocked)
  }
}
