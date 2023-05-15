export default class BaseComponent {
  constructor({
    parentNode = null,
    tag = 'div',
    className = '',
    content = '',
    attributes = {},
  }) {
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

  appendTo(parentNode) {
    parentNode.append(this.node);
  }

  append(...nodes) {
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
