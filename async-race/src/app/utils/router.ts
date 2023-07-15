import type { RoutesMap } from '@core/types/types'

export class Router {
  private currentHash?: string

  constructor(private readonly routes: RoutesMap, private errorPage: () => void) {
    window.addEventListener('hashchange', this.onHashChangeHandler)
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
}
