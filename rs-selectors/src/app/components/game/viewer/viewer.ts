import { BaseComponent } from '../../../utils/base-component/base-component'
import './viewer.scss'
import './custom-elements.scss'
import { CustomElementDescription } from '../../../types/types'
import { customElementsContent, winMessage } from '../../../shared/constants'
import { EventEmitter } from '../../../utils/event-emitter/event-emitter'

export class Viewer extends BaseComponent {
  private container = new BaseComponent({ className: 'shelf' }).node
  private winBlock = new BaseComponent({ className: 'win__container', content: winMessage })
  public elements: HTMLElement[] = []
  private selectedElements: HTMLElement[] = []
  constructor(private emitter: EventEmitter) {
    super({ className: 'game__viewer' })
    this.append(this.container)
    this.winBlock.addListener('animationend', (): void => {
      this.winBlock.removeClass('active')
    })
    this.emitter.on('finishGame', (): void => {
      this.showWinBlock()
    })
  }

  private clearContent(): void {
    this.elements = []
    this.container.innerHTML = ''
  }

  public showLevel(elements: CustomElementDescription[]): void {
    this.clearContent()
    this.createElements(elements, this.container)
  }

  private createElements(elements: CustomElementDescription[], root: HTMLElement): void {
    elements.forEach((element) => {
      const node = document.createElement(element.tag)
      node.innerHTML = customElementsContent[element.tag] || ''
      if (element.class) {
        node.className = element.class
      }
      if (element.toSelect) {
        node.classList.add('animated')
      }
      if (element.attr) {
        Object.entries(element.attr).forEach(([key, value]) => node.setAttribute(key, value))
      }
      if (element.children) {
        this.createElements(element.children, node)
      }
      node.append(this.createTooltip(element.tag))
      root.append(node)
      this.elements.push(node)
    })
  }

  private createTooltip(tag: string): HTMLDivElement {
    const content = `<${tag}></${tag}>`
    const tooltip = new BaseComponent({ className: 'tooltip' })
    tooltip.setContent(content)
    return tooltip.node
  }

  public applySelector(selector: string, correctAmount: number): boolean {
    this.selectedElements = Array.from(this.container.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => el.nodeName !== 'DIV',
    )
    const isCorrect =
      this.selectedElements.length === correctAmount &&
      this.selectedElements.every((el) => el.classList.contains('animated'))
    return isCorrect
  }

  public completeLevel(): void {
    this.addClass('finish-level')
    const finishListener = (): void => {
      this.node.removeEventListener('animationend', finishListener)
      this.removeClass('finish-level')
      this.emitter.emit('completeAnimationEnds', null)
    }
    this.addListener('animationend', finishListener)
  }

  public showWrongAnswer(): void {
    const stopShaking = (): void => {
      this.node.removeEventListener('animationend', stopShaking)
      this.selectedElements.forEach((el) => el.classList.remove('shake'))
    }

    if (this.selectedElements.length) {
      this.addListener('animationend', stopShaking)
      this.selectedElements.forEach((el) => el.classList.add('shake'))
    } else {
      this.emitter.emit('shakeEditor', null)
    }
  }

  private showWinBlock(): void {
    this.clearContent()
    this.container.append(this.winBlock.node)
    this.winBlock.addClass('active')
  }
}
