import { CustomTags, GameData } from '../types/types'

export const CssEditorParams = {
  fileName: 'styles.css',
  title: 'CSS Editor',
  minLinesAmount: 1,
  placeholder: 'Type in a CSS selector',
  btnText: 'Enter',
}

export const HtmlEditorParams = {
  fileName: 'table.html',
  title: 'HTML Viewer',
  minLinesAmount: 13,
  baseTagOpening: '<shelf>',
  baseTagEnding: '</shelf>',
}

export const defaultGameData: GameData = {
  currentLevel: 0,
  finishedLevels: new Set(),
  finishedWithHint: new Set(),
}

export const customElementsContent: Record<CustomTags, string> = {
  pot: '<div class="border"></div><div class="bottom"></div>',
  seedling: '<div class="stem"></div>',
  camomile: '<div class="head"></div><div class="stem"></div>',
}
