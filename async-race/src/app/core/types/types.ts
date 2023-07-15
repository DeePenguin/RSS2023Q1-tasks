import type { Component } from '@shared/models/component.model'

export type PagesRecord = Record<string, Component>
export type RoutesMap = Map<string, () => void>
