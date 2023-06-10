import { ApiResponceStatus } from './enums'
import { ValidFilters } from './types'

export interface Source {
  id: string
  name: string
  description: string
  url: string
  category: string
  language: string
  country: string
}

export interface NewsArticle {
  source: Pick<Source, 'id' | 'name'>
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export interface ApiResponse {
  status: ApiResponceStatus
  code?: string
  message?: string
}

export interface NewsResponse extends ApiResponse {
  totalResults: number
  articles: NewsArticle[]
}

export interface SourcesResponse extends ApiResponse {
  sources: Source[]
}

export interface SourcesFilter {
  [key: ValidFilters | string]: Record<string, Source[]>
}
