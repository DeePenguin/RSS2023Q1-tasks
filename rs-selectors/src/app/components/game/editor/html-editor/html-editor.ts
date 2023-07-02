import xml from 'highlight.js/lib/languages/xml'
import { BaseComponentInterface } from '../../../../models/base-component.model'
import { CustomElementDescription } from '../../../../types/types'
import { BaseComponent } from '../../../../utils/base-component/base-component'
import { HtmlEditorParams } from '../../../../shared/constants'
import { Editor } from '../editor'

import './html-editor.scss'

export class HtmlEditor extends Editor {
  public elements: HTMLElement[] = []
  private markupContainer = new BaseComponent({
    className: 'editor__markup',
    attr: { 'data-opening': HtmlEditorParams.baseTagOpening, 'data-ending': HtmlEditorParams.baseTagEnding },
  })
  constructor() {
    super(HtmlEditorParams.minLinesAmount)
    this.addClass('editor-html')
    this.title.setContent(HtmlEditorParams.title)
    this.fileName.setContent(HtmlEditorParams.fileName)
    this.content.append(this.markupContainer)
    this.hljs.registerLanguage('xml', xml)
    this.hljs.configure({ languages: ['xml'] })
  }

  public showLevel(elements: CustomElementDescription[]): void {
    this.elements = []
    this.markupContainer.node.innerHTML = ''
    this.createMarkup(elements, this.markupContainer)
  }

  private highlight(str: string): string {
    const content = this.hljs.highlight(str, { language: 'xml' }).value

    return content
  }

  private createMarkup(elements: CustomElementDescription[], root: BaseComponentInterface): void {
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
        markup.node.insertAdjacentHTML('beforeend', this.highlight(content))
      } else {
        content += `>`
        const ending = `</${element.tag}>`
        markup.node.insertAdjacentHTML('beforeend', this.highlight(content))
        this.createMarkup(element.children, markup)
        markup.node.insertAdjacentHTML('beforeend', this.highlight(ending))
      }
      root.append(markup)
      this.elements.push(markup.node)
    })
  }
}
