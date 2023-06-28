import { BaseComponentInterface } from '../types/interfaces/baseComponentInterface'
import { ComponentProps } from '../types/types'

export class BaseComponent<T extends keyof HTMLElementTagNameMap = 'div'> implements BaseComponentInterface {
  public node: HTMLElementTagNameMap[T]
  constructor({ parent = null, tag = 'div' as T, className = '', content = '', attr }: Partial<ComponentProps<T>>) {
    this.node = document.createElement(tag)
    this.node.className = className
    this.node.innerHTML = content
    if (attr) {
      this.setAttributes(attr)
    }
    if (parent) {
      parent.append(this.node)
    }
  }

  public remove(): void {
    this.node.remove()
  }

  public appendTo(parent: HTMLElement | BaseComponentInterface): void {
    parent.append(this.node)
  }

  public append<K extends keyof HTMLElementTagNameMap>(
    ...components: (HTMLElement | BaseComponent<K> | string)[]
  ): void {
    const nodes = components.map((component) => (component instanceof BaseComponent ? component.node : component))
    this.node.append(...nodes)
  }

  public addListener<E extends keyof HTMLElementEventMap>(
    eventName: E,
    callback: (ev: HTMLElementEventMap[E]) => void,
  ): void {
    this.node.addEventListener(eventName, callback as EventListenerOrEventListenerObject)
  }

  public setAttributes(attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([prop, value]) => this.node.setAttribute(prop, value))
  }

  public removeAttributes(...attributes: string[]): void {
    attributes.forEach((attribute) => this.node.removeAttribute(attribute))
  }

  public setContent(content: string): void {
    this.node.textContent = content
  }

  public addClass(...classNames: string[]): void {
    this.node.classList.add(...classNames)
  }

  public removeClass(...classNames: string[]): void {
    this.node.classList.remove(...classNames)
  }

  public toggleClass(className: string, state: boolean): void {
    this.node.classList.toggle(className, state)
  }

  public get style(): CSSStyleDeclaration {
    return this.node.style
  }
}
