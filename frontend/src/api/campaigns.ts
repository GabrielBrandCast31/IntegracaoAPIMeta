import { apiGet } from './client'
import type { TopCampaignsResponse } from '../types/api'

export function fetchTopCampaigns(limit = 4): Promise<TopCampaignsResponse> {
  return apiGet<TopCampaignsResponse>(`/api/v1/campaigns/top?limit=${limit}`)
}
