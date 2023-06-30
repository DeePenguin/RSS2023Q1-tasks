import { Level } from '../types/types'

export const levels: Level[] = [
  {
    answer: 'pot',
    description: 'Select all pots',
    title: 'A',
    elementsToSelectAmount: 3,
    elements: [
      {
        tag: 'pot',
        toSelect: true,
        children: [
          {
            tag: 'cactus',
          },
        ],
      },
      {
        tag: 'pot',
        toSelect: true,
        class: 'bowl',
        children: [
          {
            tag: 'camomile',
          },
        ],
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
    answer: '#zebra cactus',
    description: 'Select cactus in zebra pot',
    title: '#ID',
    elementsToSelectAmount: 1,
    elements: [
      {
        tag: 'pot',
        children: [
          {
            tag: 'cactus',
          },
        ],
      },
      {
        tag: 'pot',
        attr: { id: 'zebra' },
        children: [
          {
            tag: 'cactus',
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'cactus',
          },
        ],
      },
    ],
  },
  {
    answer: '.bowl .tall',
    description: 'Select all tall cacti in bowl pots',
    title: '.Class',
    elementsToSelectAmount: 2,
    elements: [
      {
        tag: 'pot',
        attr: { id: 'teacup' },
        children: [
          {
            tag: 'cactus',
            class: 'tall',
          },
        ],
      },
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'cactus',
            class: 'tall',
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        children: [
          {
            tag: 'cactus',
          },
        ],
      },
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'cactus',
            class: 'tall',
            toSelect: true,
            children: [
              {
                tag: 'flower',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    answer: 'camomile[color]',
    description: 'Select all colored camomiles',
    title: '[Attribute]',
    elementsToSelectAmount: 3,
    elements: [
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'camomile',
            attr: { color: 'pink' },
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        children: [
          {
            tag: 'camomile',
            attr: { color: 'blue' },
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'camomile',
          },
        ],
      },
      {
        tag: 'pot',
        attr: { id: 'teacup' },
        children: [
          {
            tag: 'camomile',
            attr: { color: 'violet' },
            toSelect: true,
          },
        ],
      },
    ],
  },
  {
    answer: '[color*="in"]',
    maxLength: 13,
    description: 'Select pink and aquamarine camomiles. Max selector length: 13',
    title: '[Attribute*="wildcard"]',
    elementsToSelectAmount: 2,
    elements: [
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'camomile',
            attr: { color: 'pink' },
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        children: [
          {
            tag: 'camomile',
            attr: { color: 'blue' },
          },
        ],
      },
      {
        tag: 'pot',
        children: [
          {
            tag: 'camomile',
            attr: { color: 'aquamarine' },
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'camomile',
            attr: { color: 'violet' },
          },
        ],
      },
    ],
  },
  {
    answer: 'pot:not(#zebra) *',
    description: 'Select all plants in all pots except zebra',
    title: ':not()',
    elementsToSelectAmount: 3,
    elements: [
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'camomile',
            attr: { color: 'pink' },
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        attr: { id: 'teacup' },
        children: [
          {
            tag: 'seedling',
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        attr: { id: 'zebra' },
        children: [
          {
            tag: 'cactus',
          },
        ],
      },
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'flower',
            toSelect: true,
          },
        ],
      },
    ],
  },
  {
    answer: ':where(#teacup, #zebra) cactus',
    description: 'Select cacti in teacup and zebra pot',
    title: ':where()',
    elementsToSelectAmount: 2,
    elements: [
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'camomile',
          },
        ],
      },
      {
        tag: 'pot',
        attr: { id: 'teacup' },
        children: [
          {
            tag: 'cactus',
            class: 'tall',
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        attr: { id: 'zebra' },
        children: [
          {
            tag: 'cactus',
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'cactus',
          },
        ],
      },
    ],
  },
  {
    answer: ':is([id], .bowl) cactus',
    maxLength: 23,
    description: 'Select cacti in teacup and bowl. Max selector length: 23',
    title: ':is()',
    elementsToSelectAmount: 2,
    elements: [
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'flower',
          },
        ],
      },
      {
        tag: 'pot',
        attr: { id: 'teacup' },
        children: [
          {
            tag: 'cactus',
            class: 'tall',
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'cactus',
            toSelect: true,
          },
        ],
      },
      {
        tag: 'pot',
        children: [
          {
            tag: 'cactus',
          },
        ],
      },
    ],
  },
  {
    answer: 'pot:has(flower)',
    description: 'Select pots with flowers',
    title: ':has()',
    elementsToSelectAmount: 2,
    elements: [
      {
        tag: 'pot',
        toSelect: true,
        children: [
          {
            tag: 'flower',
          },
        ],
      },
      {
        tag: 'pot',
        class: 'bowl',
        children: [
          {
            tag: 'cactus',
            class: 'tall',
          },
        ],
      },
      {
        tag: 'pot',
        children: [
          {
            tag: 'seedling',
          },
        ],
      },
      {
        tag: 'pot',
        toSelect: true,
        attr: { id: 'teacup' },
        children: [
          {
            tag: 'cactus',
            class: 'tall',
            children: [
              {
                tag: 'flower',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    answer: 'pot:has( + pot cactus flower)',
    description: 'Select all pots to the left of flowering cacti',
    title: 'Relative :has()',
    elementsToSelectAmount: 2,
    elements: [
      {
        tag: 'pot',
        class: 'bowl',
        toSelect: true,
        children: [
          {
            tag: 'cactus',
            class: 'tall',
          },
        ],
      },
      {
        tag: 'pot',
        toSelect: true,
        children: [
          {
            tag: 'cactus',
            children: [
              {
                tag: 'flower',
              },
            ],
          },
        ],
      },
      {
        tag: 'pot',
        attr: { id: 'teacup' },
        children: [
          {
            tag: 'cactus',
            class: 'tall',
            children: [
              {
                tag: 'flower',
              },
            ],
          },
        ],
      },
      {
        tag: 'pot',
        children: [
          {
            tag: 'flower',
          },
        ],
      },
    ],
  },
]
