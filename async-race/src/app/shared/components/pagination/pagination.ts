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
    private updateSource: Observable<number>,
    private readonly itemsPerPage: number,
    private currentPage: number,
    previousBtnCallback: () => void,
    nextBtnCallback: () => void,
  ) {
    super((totalCount) => this.updatePagesAmount(totalCount), { className: 'pagination' })
    this.updateSource.subscribe(this)
    this.previousBtn = new Button(
      {
        className: 'pagination__btn pagination__btn--previous',
        content: '&lt;',
      },
      () => {
        previousBtnCallback()
        this.changePage(this.currentPage - 1)
      },
    )

    this.nextBtn = new Button(
      {
        className: 'pagination__btn pagination__btn--next',
        content: '&gt;',
      },
      () => {
        nextBtnCallback()
        this.changePage(this.currentPage + 1)
      },
    )
    this.append(this.previousBtn, this.counterElement, this.nextBtn)
  }

  private updatePagesAmount(totalCount: number): void {
    this.pagesAmount = Math.ceil(totalCount / this.itemsPerPage)
    this.updateCounterElement()
    this.toggleButtonsDisability()
  }

  private toggleButtonsDisability(): void {
    const isFirstPage = this.currentPage === 1
    const isLastPage = this.currentPage === this.pagesAmount
    this.previousBtn.toggleDisable(isFirstPage)
    this.nextBtn.toggleDisable(isLastPage)
  }

  private changePage(pageNumber: number): void {
    this.currentPage = pageNumber
    this.updateCounterElement()
    this.toggleButtonsDisability()
  }

  private updateCounterElement(): void {
    this.counterElement.setContent(`Page ${this.currentPage} / ${this.pagesAmount}`)
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
