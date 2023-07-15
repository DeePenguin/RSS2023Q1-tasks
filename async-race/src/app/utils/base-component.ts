import type { Component } from '@/app/shared/models/component.model'

type ComponentProps<T> = {
  parent?: HTMLElement | Component
  tag: T
  className: string
  content: string
  attr: Record<string, string>
}

export class BaseComponent<T extends keyof HTMLElementTagNameMap = 'div'> implements Component {
  protected node: HTMLElementTagNameMap[T]
  constructor({ parent, tag = 'div' as T, className = '', content = '', attr }: Partial<ComponentProps<T>>) {
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

  public getNode(): HTMLElementTagNameMap[T] {
    return this.node
  }

  public remove(): void {
    this.node.remove()
  }

  public appendTo(parent: HTMLElement | Component): void {
    parent.append(this.node)
  }

  public append(...components: (HTMLElement | Component | string)[]): void {
    this.node.append(
      ...components.map((component) =>
        component instanceof HTMLElement || typeof component === 'string' ? component : component.getNode(),
      ),
    )
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

  public toggleClass(className: string, state?: boolean): void {
    this.node.classList.toggle(className, state)
  }

  public setStyle(props: { [keys: string]: string }): void {
    Object.assign(this.node.style, props)
  }
}
