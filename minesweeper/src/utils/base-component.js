import EventEmitter from './event-emitter';

export default class BaseComponent extends EventEmitter {
  constructor({
    parentNode = null,
    tag = 'div',
    className = '',
    content = '',
    attributes = {},
  }) {
    super();
    const node = document.createElement(tag);
    node.className = className;
    node.innerHTML = content;
    this.setAttributes(attributes);
    if (parentNode) parentNode.append(node);
    this.node = node;
  }

  remove() {
    this.node.remove();
  }

  appendTo(parent) {
    const parentNode = parent instanceof HTMLElement
      ? parent
      : parent.node;
    parentNode.append(this.node);
  }

  append(...components) {
    const nodes = components.map((component) => (
      component instanceof HTMLElement
        ? component
        : component.node
    ));
    this.node.append(...nodes);
  }

  addListener(eventName, callback) {
    this.node.addEventListener(eventName, callback);
  }

  setAttributes(attributes) {
    Object.entries(attributes).forEach(([prop, value]) => this.node.setAttribute(prop, value));
  }

  setContent(content) {
    this.node.textContent = content;
  }

  addClass(...classNames) {
    this.node.classList.add(...classNames);
  }

  toggleClass(className, state) {
    this.node.classList.toggle(className, state);
  }
}
