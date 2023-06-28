import css from 'highlight.js/lib/languages/css'
import { Editor } from '../editor'
import { BaseComponent } from '../../../../../utils/base-component'
import { CssEditorParams } from '../../../../../utils/constants'

import './css-editor.scss'
import { EventEmitter } from '../../../../../utils/event-emitter'

export class CssEditor extends Editor {
  private answer = new BaseComponent({
    className: 'editor__answer',
  })
  private input = new BaseComponent({
    parent: this.answer,
    tag: 'textarea',
    className: 'answer__input',
    attr: { rows: '1', placeholder: CssEditorParams.placeholder },
  })
  private markup = new BaseComponent({
    parent: this.answer,
    className: 'answer__markup language-css',
    attr: { 'data-placeholder': CssEditorParams.placeholder },
  })

  private button = new BaseComponent({
    tag: 'button',
    className: 'editor__button',
    content: CssEditorParams.btnText,
    attr: { type: 'button' },
  })

  constructor(private emitter: EventEmitter) {
    super(CssEditorParams.minLinesAmount)
    this.addClass('editor-css')
    this.title.setContent(CssEditorParams.title)
    this.fileName.setContent(CssEditorParams.fileName)
    this.content.append(this.answer, this.button)
    this.hljs.registerLanguage('css', css)
    this.input.addListener('keydown', (e: KeyboardEvent): void => this.handleKeydown(e))
    this.input.addListener('input', (): void => this.handleInput())
    this.button.addListener('click', (): void => this.emitCheck())
    this.emitter.on('shakeEditor', (): void => {
      this.shake()
    })
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (e.code === 'Enter') {
      e.preventDefault()
      this.emitCheck()
    }
  }

  private handleInput(): void {
    this.highlight()
  }

  private highlight(): void {
    this.markup.node.innerHTML = this.input.node.value
    this.hljs.highlightElement(this.markup.node)
  }

  private emitCheck(): void {
    this.emitter.emit('checkAnswer', this.input.node.value)
  }

  public clear(): void {
    this.input.node.value = ''
    this.markup.node.innerHTML = ''
  }

  public shake(): void {
    const listener = (): void => {
      this.removeClass('shake')
      this.node.removeEventListener('animationend', listener)
    }
    this.addClass('shake')
    this.addListener('animationend', listener)
  }

  public typeAnswer(answer: string): void {
    this.input.node.disabled = true
    this.clear()
    let i = 0
    setTimeout(() => {
      const typeChar = (): void => {
        if (i === answer.length) {
          this.input.node.disabled = false
          return
        }
        this.input.node.value += answer[i]
        i += 1
        this.highlight()
        setTimeout(typeChar, 200)
      }
      typeChar()
    }, 300)
  }
}
