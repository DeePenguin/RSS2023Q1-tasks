export interface BaseComponentInterface {
  node: HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
  style: CSSStyleDeclaration
  remove(): void
  appendTo(parent: HTMLElement | BaseComponentInterface): void
  append(...components: (HTMLElement | BaseComponentInterface | string)[]): void
  addListener(eventName: keyof GlobalEventHandlersEventMap, callback: () => void): void
  setAttributes(attributes: Record<string, string>): void
  removeAttributes(...attributes: string[]): void
  setContent(content: string): void
  addClass(...classNames: string[]): void
  removeClass(...classNames: string[]): void
  toggleClass(className: string, state: boolean): void
}
