const HEX_COMBINATIONS_COUNT = 16777215
const HEX_BASE = 16
const brands = [
  'Kubota',
  'Case',
  'Zoomlion',
  'CLAAS',
  'Dongfeng',
  'Fendt',
  'Lamborghini',
  'Landini',
  'Lovol',
  'McCormick',
  'Same',
  'Steyr',
  'Taihong',
  'Jinma',
  'Zetor',
  'MT3',
  'JCB',
  'CATMANN',
  'ISEKI',
  'Belarus',
  'URSUS',
  'SOLIS',
  'ISEKI',
  'AGROVEGA',
  'VALTRA',
]

const models = [
  'Crystal',
  'Forterra',
  'Major',
  'Proxima',
  'TERRUS',
  'Multi',
  'Argon',
  'Dorado',
  'Explorer',
  'Tiger',
  'Virtus',
  'Landforce',
  'Multifarm',
  'Powerfarm',
  'Trekker',
  'LANDPOWER',
  'Spire',
  'Strike',
  'Crono',
  'Mach',
  'NITRO',
  'Rekord',
  'Agrofarm',
  'Agrolux',
  'Agroplus',
  'Agrotrac',
  'Agrotron',
  'XERION',
  'NEXOS',
  'AXION',
  'ARION',
  'Puma',
  'Magnum',
  'Quadtrac',
  'Farmall',
]

const getRandomInInterval = (interval: number): number => Math.floor(Math.random() * interval)

const getColor = (): string => getRandomInInterval(HEX_COMBINATIONS_COUNT).toString(HEX_BASE)

const getName = (): string =>
  `${brands[getRandomInInterval(brands.length)]} ${models[getRandomInInterval(models.length)]}`

export const randomizer = {
  getColor,
  getName,
}
