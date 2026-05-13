import type { KpiMetric } from '../../types/api'

function sentimentColor(sentiment: KpiMetric['delta_sentiment']) {
  if (sentiment === 'positive') return 'text-sentiment-positive'
  if (sentiment === 'negative') return 'text-sentiment-negative'
  return 'text-on-surface-variant'
}

function trendIcon(trend: KpiMetric['delta_trend']) {
  if (trend === 'up') return 'trending_up'
  if (trend === 'down') return 'trending_down'
  return 'trending_flat'
}

export function KpiCard({ metric }: { metric: KpiMetric }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-[120px]">
      <div className="flex justify-between items-start">
        <span className="font-body-sm text-body-sm text-on-surface-variant">{metric.label}</span>
        <span className="material-symbols-outlined text-outline">{metric.icon}</span>
      </div>
      <div>
        <div className="font-display-metrics text-display-metrics text-on-background">
          {metric.value_display}
        </div>
        <div
          className={`flex items-center font-body-sm text-body-sm mt-1 ${sentimentColor(
            metric.delta_sentiment,
          )}`}
        >
          <span className="material-symbols-outlined text-[16px] mr-1">
            {trendIcon(metric.delta_trend)}
          </span>
          <span>{metric.delta_display}</span>
        </div>
      </div>
    </div>
  )
}
