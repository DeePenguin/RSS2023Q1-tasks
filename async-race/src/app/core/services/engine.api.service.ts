import { Endpoints } from '@core/enums/endpoints'
import { EngineStatuses } from '@core/enums/engine-statuses'
import type { DriveStatus } from '@core/models/drive-status.model'
import type { EngineResponse } from '@core/models/engine-response.model'
import { httpService } from '@core/services/http.service'

class EngineApiService {
  private readonly endPoint = Endpoints.Engine
  private readonly http = httpService

  public async startEngine(id: number): Promise<EngineResponse> {
    const response = await this.http.patch(this.endPoint, { query: { id, status: EngineStatuses.Started } })
    const data = (await response.json()) as EngineResponse
    return data
  }

  public async stopEngine(id: number): Promise<EngineResponse> {
    const response = await this.http.patch(this.endPoint, { query: { id, status: EngineStatuses.Stopped } })
    const data = (await response.json()) as EngineResponse
    return data
  }

  public async startDrive(id: number, duration: number): Promise<DriveStatus> {
    try {
      const response = await this.http.patch(this.endPoint, { query: { id, status: EngineStatuses.Drive } })
      const data = (await response.json()) as { success: boolean }
      return { id, duration, ...data }
    } catch (error) {
      return { id, duration, success: false }
    }
  }
}

export const engineApiService = new EngineApiService()
