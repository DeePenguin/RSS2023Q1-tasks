import { EventEmitter } from './event-emitter'

const emitter = new EventEmitter()

test('Calling subscribers after firing event', () => {
  const testFunction = jest.fn()
  emitter.on('finishGame', testFunction)
  emitter.emit('finishGame', null)
  expect(testFunction).toHaveBeenCalledTimes(1)
})
