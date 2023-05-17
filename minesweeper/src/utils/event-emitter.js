/* eslint-disable class-methods-use-this */
export default class EventEmitter {
  static #listeners = {};

  on(event, listener) {
    if (!EventEmitter.#listeners[event]) {
      EventEmitter.#listeners[event] = [];
    }
    EventEmitter.#listeners[event].push(listener);
    return listener;
  }

  off(event, listener) {
    if (EventEmitter.#listeners[event]) {
      EventEmitter.#listeners[event] = EventEmitter.#listeners[event].filter((l) => l !== listener);
    }
  }

  emit(event, ...args) {
    if (EventEmitter.#listeners[event]) {
      EventEmitter.#listeners[event].forEach((listener) => {
        listener(...args);
      });
    }
  }
}
