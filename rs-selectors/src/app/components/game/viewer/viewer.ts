import { BaseComponent } from '../../../../utils/base-component'
import './viewer.scss'
import './custom-elements.scss'
import { customElementDescription } from '../../../../types/types'
import { customElementsContent } from '../../../../utils/constants'
import { EventEmitter } from '../../../../utils/event-emitter'

export class Viewer extends BaseComponent {
  public elements: HTMLElement[] = []
  private selectedElements: HTMLElement[] = []
  constructor(private emitter: EventEmitter) {
    super({ className: 'game__viewer' })
  }

  public showLevel(elements: customElementDescription[]): void {
    this.elements = []
    this.node.innerHTML = ''
    this.createElements(elements, this.node)
  }

  private createElements(elements: customElementDescription[], root: HTMLElement): void {
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
      node.setAttribute('data-tooltip', `<${element.tag}></${element.tag}>`)
      root.append(node)
      this.elements.push(node)
    })
  }

  public applySelector(selector: string, correctAmount: number): boolean {
    this.selectedElements = Array.from(this.node.querySelectorAll<HTMLElement>(selector)).filter(
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
}
