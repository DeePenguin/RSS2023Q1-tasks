import { Store } from './store'
import { defaultGameData } from '../../../utils/constants'

const store = new Store()
const prefix = 'deepee-selectors'

const dataWithArrays = {
  currentLevel: 3,
  finishedLevels: [0, 1, 9],
  finishedWithHint: [6, 7, 8],
}

const dataWithSets = {
  currentLevel: 3,
  finishedLevels: new Set([0, 1, 9]),
  finishedWithHint: new Set([6, 7, 8]),
}

const JSONData = JSON.stringify(dataWithArrays)

describe('Store transform data correctly', () => {
  const setItem = jest.spyOn(Storage.prototype, 'setItem')
  jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSONData)
  test('Store transforms data before saving to storage', () => {
    store.saveData(dataWithSets)
    expect(setItem).toHaveBeenCalledWith(prefix, JSONData)
  })

  test('Store transforms data after receiving from storage', () => {
    const result = store.getData()
    expect(result).toEqual(dataWithSets)
  })
})

test('Store returns default data if localStorage has no data', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)
  expect(store.getData()).toEqual(defaultGameData)
})

test('Store returns data from localStorage if any', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSONData)
  expect(store.getData()).toEqual(dataWithSets)
})
