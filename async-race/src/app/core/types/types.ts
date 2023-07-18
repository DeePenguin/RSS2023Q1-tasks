import type { Component } from '@core/models/component.model'

export type PagesRecord = Record<string, () => Promise<Component>>
export type RoutesMap = Map<string, () => void>
export type RequestOptions = { body?: string; headers?: Record<string, string> }
export type RequestProps = {
  url?: number | string
  query?: Record<string, string | number>
  body?: Record<string, string>
  headers?: Record<string, string>
}
