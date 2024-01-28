import { BaseComponent } from './base-component'

describe('Create Html element', () => {
  const testComponent = new BaseComponent({
    parent: document.body,
    tag: 'span',
    className: 'span__class',
    content: 'span content',
    attr: { id: 'test_span' },
  })

  test('Element exists', () => {
    expect(testComponent.node).toBeInTheDocument()
  })

  test('Element has provided class', () => {
    expect(testComponent.node).toHaveClass('span__class')
  })

  test('Element has provided id', () => {
    expect(testComponent.node).toHaveAttribute('id', 'test_span')
  })

  test('Element has provided content', () => {
    expect(testComponent.node).toHaveTextContent('span content')
  })
})

test('Removes node', () => {
  const testComponent = new BaseComponent({
    parent: document.body,
    content: 'content',
  })

  testComponent.remove()
  expect(testComponent.node).not.toBeInTheDocument()
})

test('Change node content', () => {
  const testComponent = new BaseComponent({
    parent: document.body,
    attr: { id: 'remove' },
  })

  testComponent.setContent('new content')
  expect(testComponent.node).toHaveTextContent('new content')
})
