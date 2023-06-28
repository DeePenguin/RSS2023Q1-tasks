import { BaseComponentInterface } from './interfaces/baseComponentInterface'

export type ComponentProps<T> = {
  parent: HTMLElement | BaseComponentInterface | null
  tag: T
  className: string
  content: string
  attr: Record<string, string>
}

export type EventKey = string & keyof EventMap
export type Listener<M extends EventKey> = (args: EventMap[M]) => void

export type GameData = {
  currentLevel: number
  finishedLevels: number[]
  finishedWithHint: number[]
}

export type Level = {
  answer: string
  description: string
  title: string
  elementsToSelectAmount: number
  elements: customElementDescription[]
}

export type CustomTags = 'pot' | 'seedling' | 'camomile'

export type customElementDescription = {
  tag: CustomTags
  toSelect?: boolean
  class?: string
  attr?: Record<string, string>
  children?: customElementDescription[]
}

export type EventMap = {
  selectLevel: number
  resetProgress: undefined
  checkAnswer: string
  hint: null
  completeLevel: null
  completeAnimationEnds: null
  shakeEditor: null
}
