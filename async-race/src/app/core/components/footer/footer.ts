import { BaseComponent } from '@utils/base-component'
import './footer.scss'
import githubLogo from '@assets/icons/github-logo.svg'
import rsLogo from '@assets/icons/rss-logo.svg'

const content = `
  <a class = "footer__link" target= "_blank" href="https://github.com/DeePenguin" title="github">
    <img class = "footer__logo" src="${githubLogo}" alt="github logo"/>
  </a>
  <p class = "footer__copy">© DeePenguin 2023</p>
  <a class = "footer__link" target= "_blank" href="https://rs.school/js/" title="rs school">
    <img class = "footer__logo" src="${rsLogo}" alt="rs logo"/>
  </a>
`

export const footer = new BaseComponent({ tag: 'footer', className: 'footer', content })
