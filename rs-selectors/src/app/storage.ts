import { GameData } from '../types/types'
// import { defaultGameData } from '../utils/constants'

const fakeGameData: GameData = {
  currentLevel: 0,
  finishedLevels: new Set([1, 2]),
  finishedWithHint: new Set([1, 2]),
}

export class Storage {
  private lsPrefix = 'deepee-selectors'

  public getData(): GameData {
    // const data = localStorage.getItem(this.lsPrefix)
    // return data ? (JSON.parse(data) as GameData) : defaultGameData
    return fakeGameData
  }

  public saveData(data: GameData): void {
    localStorage.setItem(this.lsPrefix, JSON.stringify(data))
  }
}
