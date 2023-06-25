export class EventEmitter {
  private listeners: { [key: string]: ((...args: unknown[]) => void)[] } = {}

  on(event: string, listener: (...args: unknown[]) => void): (...args: unknown[]) => void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(listener)
    return listener
  }

  off(event: string, listener: (...args: unknown[]) => void): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((callback) => callback !== listener)
    }
  }

  emit(event: string, ...args: unknown[]): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        listener(...args)
      })
    }
  }
}
