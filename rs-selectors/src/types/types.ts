import { BaseComponentInterface } from './interfaces/baseComponentInterface'

export type ComponentProps<T> = {
  parent: HTMLElement | BaseComponentInterface | null
  tag: T
  className: string
  content: string
}
