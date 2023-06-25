import { Level } from '../types/types'

export const levels: Level[] = [
  {
    answer: 'pot',
    description: 'Select all the pots',
    title: 'Type selector',
    elementsToSelectAmount: 3,
    elements: [
      {
        tag: 'pot',
        toSelect: true,
      },
      {
        tag: 'pot',
        toSelect: true,
        class: 'bowl',
      },
      {
        tag: 'pot',
        toSelect: true,
        children: [
          {
            tag: 'seedling',
          },
        ],
      },
    ],
  },
  {
    answer: 'pot',
    description: 'Select all the pots',
    title: 'Type selector 2',
    elementsToSelectAmount: 3,
    elements: [
      {
        tag: 'pot',
        toSelect: true,
      },
      {
        tag: 'pot',
        toSelect: true,
        class: 'bowl',
      },
      {
        tag: 'pot',
        toSelect: true,
        children: [
          {
            tag: 'seedling',
          },
        ],
      },
    ],
  },
  {
    answer: 'pot',
    description: 'Select all the pots',
    title: 'Test long level title',
    elementsToSelectAmount: 3,
    elements: [
      {
        tag: 'pot',
        toSelect: true,
      },
      {
        tag: 'pot',
        toSelect: true,
        class: 'bowl',
      },
      {
        tag: 'pot',
        toSelect: true,
        children: [
          {
            tag: 'seedling',
          },
        ],
      },
    ],
  },
]
