import { apiGet } from './client'
import type { DashboardOverview, DashboardPeriod, PlatformPerformance } from '../types/api'

export function fetchDashboardOverview(
  period: DashboardPeriod = 'last_30_days',
): Promise<DashboardOverview> {
  return apiGet<DashboardOverview>(`/api/v1/dashboard/overview?period=${period}`)
}

export function fetchPlatformPerformance(
  period: DashboardPeriod = 'last_30_days',
): Promise<PlatformPerformance> {
  return apiGet<PlatformPerformance>(`/api/v1/dashboard/platform-performance?period=${period}`)
}
