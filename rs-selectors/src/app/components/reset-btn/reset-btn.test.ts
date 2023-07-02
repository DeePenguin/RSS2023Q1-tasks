import userEvent from '@testing-library/user-event'
import { EventEmitter } from '../../utils/event-emitter/event-emitter'
import { ResetBtn } from './reset-btn'

const user = userEvent.setup()
const emitter = new EventEmitter()
const fn = jest.fn()
emitter.on('resetProgress', fn)
const button = new ResetBtn(emitter)
button.appendTo(document.body)

test('button exists', () => {
  expect(button.node).toBeInTheDocument()
})

test('click fires reset event', async () => {
  await user.click(button.node)
  expect(fn).toHaveBeenCalledTimes(1)
})
