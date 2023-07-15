import { BaseComponent } from '@utils/base-component'
import { Router } from '@utils/router'
import { Header } from '@components/header/header'
import { footer } from '@components/footer/footer'
import { pages } from '@core/constants/pages'
import type { Component } from '@shared/models/component.model'
import { NotFound } from '@core/components/not-found/not-found'
import type { RoutesMap } from '@core/types/types'

export class App extends BaseComponent {
  private pages = pages
  private header = new Header(pages)
  private footer = footer
  private main = new BaseComponent({ tag: 'main', className: 'main' })
  private router?: Router
  private currentPage?: Component

  private errorPage = new NotFound()
  constructor() {
    super({ className: 'root', parent: document.body })
    this.append(this.header, this.main, this.footer)
  }

  public run(): void {
    const routes: RoutesMap = new Map()
    const definedPages: [string, Component][] = Object.entries(this.pages)

    routes.set('', () => this.renderPage(this.pages.garage))

    definedPages.forEach((page) => {
      const [hash, component] = page
      routes.set(`#${hash}`, () => this.renderPage(component))
    })

    this.router = new Router(routes, () => this.renderPage(this.errorPage))
  }

  private renderPage(page: Component): void {
    this.currentPage?.remove()
    this.currentPage = page
    this.main.append(this.currentPage)
  }
}
