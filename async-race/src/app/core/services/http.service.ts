import { baseUrl } from '@core/constants/baseUrl'
import { HttpMethods } from '@core/enums/http-methods'
import type { Endpoints } from '@core/enums/endpoints'
import type { RequestOptions, RequestProps } from '@core/types/types'

class HttpService {
  protected readonly baseUrl = baseUrl

  public async get(endPoint: Endpoints, options?: RequestProps): Promise<Response> {
    return this.createRequest(HttpMethods.Get, endPoint, options)
  }

  public async post(endPoint: Endpoints, options?: RequestProps): Promise<Response> {
    return this.createRequest(HttpMethods.Post, endPoint, options)
  }

  public async put(endPoint: Endpoints, options?: RequestProps): Promise<Response> {
    return this.createRequest(HttpMethods.Put, endPoint, options)
  }

  public async patch(endPoint: Endpoints, options?: RequestProps): Promise<Response> {
    return this.createRequest(HttpMethods.Patch, endPoint, options)
  }

  public async delete(endPoint: Endpoints, options?: RequestProps): Promise<Response> {
    return this.createRequest(HttpMethods.Delete, endPoint, options)
  }

  private async createRequest(method: HttpMethods, endPoint: Endpoints, options?: RequestProps): Promise<Response> {
    const { url, query, body, headers } = options ?? {
      body: {},
      headers: {},
    }
    return this.request(method, this.buildUrl(endPoint, { url, query }), {
      body: JSON.stringify(body),
      headers,
    })
  }

  private buildUrl(
    endPoint: Endpoints,
    { url, query }: { url?: string | number; query?: Record<string, string | number> },
  ): string {
    const urlParams = url ? `/${url}` : ''
    const queryParams = query
      ? '?'.concat(
          Object.entries(query)
            .map(([key, value]) => `${key}=${value}`)
            .join('&'),
        )
      : ''
    return `${this.baseUrl}${endPoint}${urlParams}${queryParams}`
  }

  private async request(method: HttpMethods, url: string, { body, headers }: RequestOptions): Promise<Response> {
    return fetch(url, {
      method,
      body,
      headers,
    })
  }
}

export const httpService = new HttpService()
