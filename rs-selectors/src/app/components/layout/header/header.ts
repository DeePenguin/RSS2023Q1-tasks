import { BaseComponent } from '../../../utils/base-component/base-component'
import './header.scss'

const content = '<h1 class = "header__title">RS-Selectors</h1>'

export const header = new BaseComponent({ tag: 'header', className: 'header', content })
