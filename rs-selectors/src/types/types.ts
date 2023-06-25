import { BaseComponentInterface } from './interfaces/baseComponentInterface'

export type ComponentProps<T> = {
  parent: HTMLElement | BaseComponentInterface | null
  tag: T
  className: string
  content: string
  attr: Record<string, string>
}

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

export type customElementDescription = {
  tag: string
  toSelect?: boolean
  class?: string
  attr?: Record<string, string>
  children?: customElementDescription[]
}
