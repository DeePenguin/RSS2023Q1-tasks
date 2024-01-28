import { EventKey, EventMap, Listener } from '../../types/types'

export class EventEmitter {
  private listeners: { [K in keyof EventMap]?: Listener<K>[] } = {}

  public on<E extends EventKey>(event: E, listener: Listener<E>): Listener<E> {
    if (!(event in this.listeners)) {
      this.listeners[event] = []
    }
    const listeners = this.listeners[event]
    // eslint-disable-next-line
    listeners!.push(listener)
    return listener
  }

  public off<E extends EventKey>(event: E, listener: Listener<E>): void {
    let listeners: Listener<E>[] | undefined = this.listeners[event]
    if (listeners) {
      listeners = listeners.filter((callback) => callback !== listener)
    }
  }

  public emit<E extends EventKey>(event: E, args: EventMap[E]): void {
    const listeners: Listener<E>[] | undefined = this.listeners[event]
    if (listeners) {
      listeners.forEach((listener) => {
        listener(args)
      })
    }
  }
}
