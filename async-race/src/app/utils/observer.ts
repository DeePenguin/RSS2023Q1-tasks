export class Observer<ValueType> {
  constructor(public update: (value: ValueType) => void) {}
}
