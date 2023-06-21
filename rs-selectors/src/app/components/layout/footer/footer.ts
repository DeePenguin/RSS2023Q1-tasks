import { BaseComponent } from '../../../../utils/base-component'
import './footer.scss'
import githubLogo from '../../../../assets/icons/github-logo.svg'
import rsLogo from '../../../../assets/icons/rss-logo.svg'

const content = `
  <div class= "container">
    <a class = "footer__link" target= "_blank" href="https://github.com/DeePenguin">
      <img class = "footer__logo" src="${githubLogo}"/>
    </a>
    <p class = "footer__copy">© DeePenguin 2023</p>
    <a class = "footer__link" target= "_blank" href="https://rs.school/js/">
      <img class = "footer__logo" src="${rsLogo}"/>
    </a>
  </div>
`

export const footer = new BaseComponent({ tag: 'footer', className: 'footer', content })
