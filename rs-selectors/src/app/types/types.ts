import { BaseComponentInterface } from '../models/base-component.model'

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
  finishedLevels: Set<number>
  finishedWithHint: Set<number>
}

export type Level = {
  answer: string
  maxLength?: number
  description: string
  title: string
  elementsToSelectAmount: number
  elements: CustomElementDescription[]
}

export type CustomTags = 'pot' | 'seedling' | 'camomile' | 'cactus' | 'flower'

export type CustomElementDescription = {
  tag: CustomTags
  toSelect?: boolean
  class?: string
  attr?: Record<string, string>
  children?: CustomElementDescription[]
}

export type EventMap = {
  selectLevel: number
  resetProgress: null
  checkAnswer: string
  hint: null
  completeLevel: null
  completeAnimationEnds: null
  shakeEditor: null
  finishGame: null
}
