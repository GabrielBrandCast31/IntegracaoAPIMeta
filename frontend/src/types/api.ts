export type DashboardPeriod = 'last_7_days' | 'last_30_days' | 'this_month'

export type MetricKey =
  | 'investment'
  | 'clicks'
  | 'ctr'
  | 'cpc'
  | 'conversions'
  | 'roas'

export type DeltaTrend = 'up' | 'down' | 'flat'

export type Sentiment = 'positive' | 'negative' | 'neutral'

export type Platform = 'meta' | 'google'

export interface KpiMetric {
  key: MetricKey
  label: string
  icon: string
  value_display: string
  delta_display: string
  delta_trend: DeltaTrend
  delta_sentiment: Sentiment
}

export interface DashboardOverview {
  period: DashboardPeriod
  metrics: KpiMetric[]
}

export interface TimeSeriesPoint {
  timestamp: string
  value: number
}

export interface PlatformSeries {
  platform: Platform
  label: string
  color: string
  points: TimeSeriesPoint[]
}

export interface PlatformPerformance {
  period: DashboardPeriod
  series: PlatformSeries[]
}

export interface TopCampaign {
  id: string
  name: string
  platform: Platform
  platform_label: string
  spend_display: string
  conversions: number
  cpa_display: string
}

export interface TopCampaignsResponse {
  items: TopCampaign[]
}

export type AlertSeverity = 'critical' | 'warning' | 'info'

export interface Alert {
  id: string
  severity: AlertSeverity
  icon: string
  title: string
  description: string
  action_label: string | null
  action_href: string | null
}

export interface AlertsResponse {
  items: Alert[]
  critical_count: number
}
