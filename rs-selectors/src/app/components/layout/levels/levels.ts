import { BaseComponent } from '../../../utils/base-component/base-component'
import './levels.scss'

const content = '<header class="levels__header">Choose a level</header>'

export const levels = new BaseComponent({ tag: 'section', className: 'levels', content })
