interface Component {
  parent?: HTMLElement | BaseComponent | null;
  tag?: keyof HTMLElementTagNameMap;
  className?: string;
  content?: string;
}

type ComponentProps<T = HTMLElement> = Component & Partial<T>;

class BaseComponent <T extends HTMLElement = HTMLElement> {
  node: T;

  constructor ({
    parent = null,
    tag = 'div',
    className = '',
    content = '',
  } : ComponentProps<T>) {
    const node = document.createElement(tag) as T;
    node.className = className;
    node.innerHTML = content;
    if (parent) {
      parent.append(node);
    }
    this.node = node;
  }

  remove(): void {
    this.node.remove();
  }

  appendTo(parent: HTMLElement | BaseComponent): void {
    parent.append(this.node);
  }

  append(...components: (HTMLElement | BaseComponent)[]): void {
    const nodes = components.map((component) => (
      component instanceof HTMLElement
        ? component
        : component.node
    ));
    this.node.append(...nodes);
  }

  addListener(eventName: keyof GlobalEventHandlersEventMap, callback: () => void): void {
    this.node.addEventListener(eventName, callback);
  }

  setAttributes(attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([prop, value]) => this.node.setAttribute(prop, value));
  }

  removeAttributes(...attributes: string[]): void {
    attributes.forEach((attribute) => this.node.removeAttribute(attribute));
  }

  setContent(content: string): void {
    this.node.textContent = content;
  }

  addClass(...classNames: string[]): void {
    this.node.classList.add(...classNames);
  }

  removeClass(...classNames: string[]): void {
    this.node.classList.remove(...classNames);
  }

  toggleClass(className: string, state: boolean): void {
    this.node.classList.toggle(className, state);
  }

  get style(): CSSStyleDeclaration {
    return this.node.style;
  }
}

export { BaseComponent };
