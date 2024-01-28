type EventsMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => void
}

type EventKey<EvMap extends EventsMap> = string & keyof EvMap
type Listener<Event extends EventKey<EvMap>, EvMap extends EventsMap> = EvMap[Event]
type ListenerProps<Event extends EventKey<EvMap>, EvMap extends EventsMap> = Parameters<Listener<Event, EvMap>>

export class EventEmitter<Map extends EventsMap> {
  private listeners: { [EventType in keyof Map & string]?: Set<Listener<EventType, Map>> } = {}

  public on<EventType extends EventKey<Map>>(
    event: EventType,
    listener: Listener<EventType, Map>,
  ): Listener<EventType, Map> {
    const listeners = this.listeners[event] ?? new Set()
    listeners.add(listener)
    if (!(event in this.listeners)) {
      this.listeners[event] = listeners
    }
    return listener
  }

  public off<EventType extends EventKey<Map>>(event: EventType, listener: Listener<EventType, Map>): void {
    const listeners = this.listeners[event]
    if (listeners && listeners.has(listener)) {
      listeners.delete(listener)
    }
  }

  public emit<EventType extends EventKey<Map>>(event: EventType, ...args: ListenerProps<EventType, Map>): void {
    const listeners = this.listeners[event]
    if (listeners) {
      listeners.forEach((listener) => {
        listener(...args)
      })
    }
  }
}
