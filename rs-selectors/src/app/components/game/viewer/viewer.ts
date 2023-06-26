import { BaseComponent } from '../../../../utils/base-component'
import './viewer.scss'
import './custom-elements.scss'
import { customElementDescription } from '../../../../types/types'
import { customElementsContent } from '../../../../utils/constants'

export class Viewer extends BaseComponent {
  public elements: HTMLElement[] = []
  constructor() {
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
}
