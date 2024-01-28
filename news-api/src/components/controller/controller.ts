import { EndPoints } from '../../types/enums'
import { NewsResponse, Source, SourcesFilter, SourcesResponse } from '../../types/interfaces'
import { ValidFilters } from '../../types/types'
import { AppLoader } from './appLoader'

export class AppController extends AppLoader {
  private filteredSources!: Readonly<SourcesFilter>

  private currentFilters: Record<string, string[]> = {
    country: [],
    category: [],
    language: [],
  }

  public getSources(callback: (data: SourcesResponse) => void): void {
    super.getResp<SourcesResponse>({ endpoint: EndPoints.sources }, callback)
  }

  public createFilters(data: SourcesResponse): SourcesFilter {
    const { sources } = data
    const filters: SourcesFilter = {}
    const keys: ValidFilters[] = ['country', 'category', 'language']
    keys.forEach((key) => {
      filters[key] = this.filterByKey(sources, key)
    })
    this.filteredSources = filters
    return filters
  }

  private filterByKey(data: Source[], filter: ValidFilters): Record<string, Source[]> {
    return data.reduce((acc: { [key: string]: Source[] }, item) => {
      const key = item[filter]
      acc[key] = (acc[key] || []).concat(item)
      return acc
    }, {})
  }

  public filterSources(e: MouseEvent): Source[] {
    let { target } = e
    const filtersContainer = e.currentTarget

    while (target !== filtersContainer && target instanceof HTMLElement) {
      if (target.classList.contains('filters__item-label')) {
        const key = target.getAttribute('data-filter-key')
        const value = target.getAttribute('data-filter-value')
        const input = target.querySelector('input')
        let isChecked: boolean
        if (input && key && value) {
          isChecked = input.checked
          if (isChecked) {
            this.currentFilters[key].push(value)
          } else {
            this.currentFilters[key] = this.currentFilters[key].filter((item) => item !== value)
          }
        }
        let result: Source[] = []

        Object.keys(this.currentFilters).forEach((filterKey) => {
          const values = this.currentFilters[filterKey]
          if (values.length) {
            if (!result.length) {
              values.forEach((filterValue) => result.push(...this.filteredSources[filterKey][filterValue]))
            } else {
              result = result.filter((item) => values.includes(item[filterKey as keyof Source]))
            }
          }
        })
        return result
      }
      target = target.parentNode
    }
    return []
  }

  public getNews(e: MouseEvent, callback: (data: NewsResponse) => void): boolean {
    let { target } = e
    const sourcesContainer = e.currentTarget

    while (target !== sourcesContainer && target instanceof HTMLElement) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id')
        if (sourcesContainer instanceof HTMLElement) {
          const currentSource = sourcesContainer.getAttribute('data-source')
          if (sourceId && currentSource !== sourceId) {
            sourcesContainer.setAttribute('data-source', sourceId)
            super.getResp<NewsResponse>(
              {
                endpoint: EndPoints.everything,
                options: {
                  sources: sourceId,
                },
              },
              callback,
            )
          }
        }
        return true
      }
      target = target.parentNode
    }
    return false
  }
}
