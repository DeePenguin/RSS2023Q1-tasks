import { BaseComponent } from '@utils/base-component'
import { Router } from '@utils/router'
import { Header } from '@core/components/header/header'
import { footer } from '@core/components/footer/footer'
import { pages } from '@core/constants/pages'
import type { Component } from '@core/models/component.model'
import { NotFound } from '@core/components/not-found/not-found'
import type { RoutesMap, PageState } from '@core/types/types'
import { Observable } from '@utils/observable'

export class App extends BaseComponent {
  private pages = pages
  private header = new Header(pages)
  private footer = footer
  private main = new BaseComponent({ tag: 'main', className: 'main' })
  private router?: Router
  private currentPage?: Component
  private store: Map<string, PageState> = new Map()

  private errorPage = new NotFound()
  constructor() {
    super({ className: 'root', parent: document.body })
    this.append(this.header, this.main, this.footer)
  }

  public run(): void {
    const routes: RoutesMap = new Map()
    const definedPages = Object.entries(this.pages)

    definedPages.forEach((page) => {
      const [hash, component] = page
      this.store.set(hash, { currentPage: new Observable<number>(1) })
      routes.set(`#${hash}`, () => this.renderPage(component(this.store.get(hash) as PageState)))
    })

    routes.set('', () => this.renderPage(this.pages.garage(this.store.get('garage') as PageState)))
    this.router = new Router(routes, () => this.renderPage(Promise.resolve(this.errorPage)))
  }

  private renderPage(newPage: Promise<Component>): void {
    newPage
      .then((page) => {
        this.currentPage?.remove()
        this.currentPage = page
        this.main.append(this.currentPage)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
