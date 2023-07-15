import type { Component } from '@core/models/component.model'

export type PagesRecord = Record<string, Component>
export type RoutesMap = Map<string, () => void>
