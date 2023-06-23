import { Editor } from '../editor'
import { BaseComponent } from '../../../../../utils/base-component'
import { CssEditorParams } from '../../../../../utils/constants'

import './css-editor.scss'

export class CssEditor extends Editor {
  private input = new BaseComponent({
    tag: 'input',
    className: 'editor__input',
    attr: { type: 'text', placeholder: CssEditorParams.placeholder },
  })

  private button = new BaseComponent({
    tag: 'button',
    className: 'editor__button',
    content: CssEditorParams.btnText,
    attr: { type: 'button' },
  })

  constructor() {
    super(CssEditorParams.minLinesAmount)
    this.addClass('editor-css')
    this.title.setContent(CssEditorParams.title)
    this.fileName.setContent(CssEditorParams.fileName)
    this.content.append(this.input, this.button)
  }

  public type(answer: string): void {
    this.input.node.value = ''
    this.input.node.disabled = true
    let i = 0
    setTimeout(() => {
      const printChar = (): void => {
        if (i === answer.length) {
          this.input.node.disabled = false
          return
        }

        this.input.node.value += answer[i]
        i += 1
        setTimeout(printChar, 300)
      }
      printChar()
    }, 500)
  }
}
