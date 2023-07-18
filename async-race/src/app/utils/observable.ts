import type { Observer } from '@core/models/observer.model'

export class Observable<ValueType> {
  private value: ValueType
  private subscribers: Set<Observer<ValueType>> = new Set()

  constructor(initialValue: ValueType) {
    this.value = initialValue
  }

  public subscribe(subscriber: Observer<ValueType>): void {
    this.subscribers.add(subscriber)
  }

  public unsubscribe(subscriber: Observer<ValueType>): void {
    this.subscribers.delete(subscriber)
  }

  public notify(): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(this.value)
    })
  }

  public setValue(newValue: ValueType): void {
    this.value = newValue
    this.notify()
  }

  public getValue(): ValueType {
    return this.value
  }
}
