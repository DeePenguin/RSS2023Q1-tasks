import { BaseComponentInterface } from '../../../../../types/interfaces/baseComponentInterface'
import { customElementDescription } from '../../../../../types/types'
import { BaseComponent } from '../../../../../utils/base-component'
import { HtmlEditorParams } from '../../../../../utils/constants'
import { Editor } from '../editor'

import './html-editor.scss'

export class HtmlEditor extends Editor {
  public elements: HTMLElement[] = []
  constructor() {
    super(HtmlEditorParams.minLinesAmount)
    this.addClass('editor-html')
    this.title.setContent(HtmlEditorParams.title)
    this.fileName.setContent(HtmlEditorParams.fileName)
  }

  public showLevel(elements: customElementDescription[]): void {
    this.elements = []
    this.content.node.innerHTML = ''
    this.createMarkup(elements, this.content)
  }

  private createMarkup(elements: customElementDescription[], root: BaseComponentInterface): void {
    elements.forEach((element) => {
      const markup = new BaseComponent({ className: 'markup' })
      let content = `<${element.tag}`
      if (element.class) {
        content += ` class="${element.class}"`
      }
      if (element.attr) {
        Object.entries(element.attr).forEach(([key, value]) => {
          content += ` ${key}="${value}"`
        })
      }
      if (!element.children) {
        content += ` />`
        markup.append(content)
      } else {
        content += `>`
        const ending = `</${element.tag}>`
        markup.append(content)
        this.createMarkup(element.children, markup)
        markup.append(ending)
      }
      root.append(markup)
      this.elements.push(markup.node)
    })
  }
}
