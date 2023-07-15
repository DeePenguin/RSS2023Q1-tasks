export interface Component {
  getNode(): HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
  remove(): void
  appendTo(parent: HTMLElement | Component): void
  append(...components: (HTMLElement | Component | string)[]): void
  addListener(eventName: keyof GlobalEventHandlersEventMap, callback: () => void): void
  setAttributes(attributes: Record<string, string>): void
  removeAttributes(...attributes: string[]): void
  setContent(content: string): void
  addClass(...classNames: string[]): void
  removeClass(...classNames: string[]): void
  toggleClass(className: string, state?: boolean): void
  setStyle(props: { [keys: string]: string }): void
}
