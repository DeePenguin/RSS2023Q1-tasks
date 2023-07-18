import type { RoutesMap } from '@core/types/types'

export class Router {
  private currentHash?: string

  constructor(private readonly routes: RoutesMap, private errorPage: () => void) {
    this.run()
    this.onHashChangeHandler()
  }

  private onHashChangeHandler = (): void => {
    const hashPath = window.location.hash
    if (this.currentHash === hashPath) {
      return
    }
    const callback = this.routes.get(hashPath) ?? this.errorPage
    callback()
    this.currentHash = hashPath
  }

  public destroy(): void {
    window.removeEventListener('hashchange', this.onHashChangeHandler)
  }

  public run(): void {
    window.addEventListener('hashchange', this.onHashChangeHandler)
  }
}
