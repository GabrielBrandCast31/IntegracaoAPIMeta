import { apiGet } from './client'
import type { AlertsResponse } from '../types/api'

export function fetchAlerts(): Promise<AlertsResponse> {
  return apiGet<AlertsResponse>('/api/v1/alerts')
}
