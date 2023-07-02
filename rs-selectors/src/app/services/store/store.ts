import { GameData } from '../../types/types'
import { defaultGameData } from '../../shared/constants'

export class Store {
  private lsPrefix = 'deepee-selectors'

  public getData(): GameData {
    const data = localStorage.getItem(this.lsPrefix)
    if (!data) {
      return defaultGameData
    }
    const storedData = JSON.parse(data, (_, value: unknown) => {
      if (Array.isArray(value)) {
        return new Set(value)
      }
      return value
    }) as GameData

    return storedData
  }

  public saveData(data: GameData): void {
    const storedData = JSON.stringify(data, (_, value: unknown) => {
      if (value instanceof Set) {
        return Array.from(value) as []
      }
      return value
    })
    localStorage.setItem(this.lsPrefix, storedData)
  }
}
