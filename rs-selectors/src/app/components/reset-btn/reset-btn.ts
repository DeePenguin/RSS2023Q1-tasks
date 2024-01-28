import { BaseComponent } from '../../utils/base-component/base-component'
import { EventEmitter } from '../../utils/event-emitter/event-emitter'
import './reset-btn.scss'

export class ResetBtn extends BaseComponent<'button'> {
  constructor(private emitter: EventEmitter) {
    super({ tag: 'button', className: 'levels__reset', content: 'Reset progress' })
    this.addListener('click', () => {
      this.emitter.emit('resetProgress', null)
    })
  }
}
