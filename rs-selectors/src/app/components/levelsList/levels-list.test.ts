import { LevelsList } from './levels-list'
import { EventEmitter } from '../../utils/event-emitter/event-emitter'
import { GameData, Level } from '../../types/types'

const gameData: GameData = {
  currentLevel: 0,
  finishedLevels: new Set(),
  finishedWithHint: new Set(),
}
const levels = [{ title: 'level 1' }, { title: 'level 2' }, { title: 'level 3' }] as Level[]
const emitter = new EventEmitter()
const list = new LevelsList(document.body, emitter, levels, gameData)

describe('Creates list', () => {
  test('list exists', () => {
    expect(list.node).toBeInTheDocument()
  })
  test('list items exists', () => {
    expect(list.node.children).toHaveLength(levels.length)
  })
  describe.each(
    levels.map(({ title }, index) => ({
      title,
      index,
    })),
  )('level content is correct', ({ title, index }) => {
    expect(list.node.children[index]).toHaveTextContent(title)
  })
})

test('Marks as completed', () => {
  list.checkAsCompleted(0)
  expect(list.node.children[0]).toHaveClass('completed')
})

test('Marks as hinted', () => {
  list.checkAsHinted(0)
  expect(list.node.children[0]).toHaveClass('hinted')
})

test('Marks current level', () => {
  expect(list.node.children[gameData.currentLevel]).toHaveClass('current')
})

test('Removes hint class if level is completed without it', () => {
  list.checkAsHinted(1)
  list.completeLevel(1, false)
  expect(list.node.children[1]).not.toHaveClass('hinted')
})
