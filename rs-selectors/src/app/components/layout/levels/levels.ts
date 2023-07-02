import { BaseComponent } from '../../../utils/base-component/base-component'
import './levels.scss'

const content = '<header class="levels__header">Choose a level</header>'
const buttonContent = '<div class ="bar"></div>'.repeat(3)

export const levels = new BaseComponent({ tag: 'section', className: 'levels', content })

const toggleButton = new BaseComponent({
  parent: levels,
  className: 'levels__burger',
  content: buttonContent,
})
toggleButton.addListener('click', () => {
  toggleButton.toggleClass('open')
  levels.toggleClass('open')
})
