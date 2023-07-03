import { GameData } from '../../types/types'
import { initialGameData } from '../../shared/constants'

export class Store {
  private lsPrefix = 'deepee-selectors'

  public getData(): GameData {
    const data = localStorage.getItem(this.lsPrefix)
    if (!data) {
      return initialGameData
    }
    const gameData = JSON.parse(data, (_, value: unknown) => {
      if (Array.isArray(value)) {
        return new Set(value)
      }
      return value
    }) as GameData

    return gameData
  }

  public saveData(data: GameData): void {
    const gameData = JSON.stringify(data, (_, value: unknown) => {
      if (value instanceof Set) {
        return Array.from(value) as []
      }
      return value
    })
    localStorage.setItem(this.lsPrefix, gameData)
  }
}
