import { BaseComponentInterface } from '../../../types/interfaces/baseComponentInterface'
import { Level } from '../../../types/types'
import { BaseComponent } from '../../../utils/base-component'
import { EventEmitter } from '../../../utils/event-emitter'
import { CssEditor, HtmlEditor } from './editor'
import './game.scss'
import { Viewer } from './viewer/viewer'

export class Game {
  private header = new BaseComponent({ tag: 'header', className: 'game__header' })
  private hintButton = new BaseComponent({
    parent: this.header,
    tag: 'button',
    className: 'game__hint-button',
    content: '?',
  })
  private title = new BaseComponent({ parent: this.header, tag: 'h2', className: 'game__title' })
  private viewer: Viewer
  private htmlEditor = new HtmlEditor()
  private cssEditor: CssEditor
  private level!: Level

  constructor(private emitter: EventEmitter, private gameField: BaseComponentInterface) {
    this.viewer = new Viewer(this.emitter)
    this.cssEditor = new CssEditor(this.emitter)
    this.gameField.append(this.header, this.viewer, this.cssEditor, this.htmlEditor)
    this.hintButton.addListener('click', (): void => this.emitHint())
    this.emitter.on('checkAnswer', (answer: string) => {
      this.checkAnswer(answer)
    })
    this.emitter.on('completeAnimationEnds', (): void => {
      this.emitter.emit('completeLevel', null)
    })
  }

  private emitHint(): void {
    this.emitter.emit('hint', null)
    this.cssEditor.typeAnswer(this.level.answer)
  }

  public showLevel(level: Level): void {
    this.level = level
    this.cssEditor.clear()
    this.title.setContent(level.description)
    this.viewer.showLevel(level.elements)
    this.htmlEditor.showLevel(level.elements)
    this.connectElements(this.viewer.elements, this.htmlEditor.elements)
  }

  private checkAnswer(answer: string): void {
    try {
      if (answer.includes('animated')) {
        throw new Error()
      }
      const isAmountCorrect = this.viewer.applySelector(answer, this.level.elementsToSelectAmount)
      if (isAmountCorrect) {
        this.viewer.completeLevel()
      } else {
        this.viewer.showWrongAnswer()
      }
    } catch (e) {
      this.emitter.emit('shakeEditor', null)
    }
  }

  private connectElements(viewerElements: HTMLElement[], markupElements: HTMLElement[]): void {
    const mouseOver = (elements: HTMLElement[]): void => {
      elements.forEach((element) => {
        element.addEventListener('mouseover', (ev: MouseEvent): void => {
          ev.stopPropagation()
          elements.forEach((el) => {
            el.classList.add('hovered')
          })
        })
      })
    }

    const mouseOut = (elements: HTMLElement[]): void => {
      elements.forEach((element) => {
        element.addEventListener('mouseout', (ev: MouseEvent): void => {
          ev.stopPropagation()
          elements.forEach((el) => {
            el.classList.remove('hovered')
          })
        })
      })
    }

    const addListeners = (...elementsArrays: HTMLElement[][]): void => {
      elementsArrays[0].forEach((_, i) => {
        const elements = elementsArrays.map((array) => array[i])
        mouseOver(elements)
        mouseOut(elements)
      })
    }

    addListeners(viewerElements, markupElements)
  }
}
