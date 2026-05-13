import { useQuery } from '@tanstack/react-query'
import { fetchDashboardOverview } from '../../api/dashboard'
import type { DashboardPeriod } from '../../types/api'
import { env } from '../../lib/env'
import { KpiCard } from './KpiCard'

const SKELETON_COUNT = 6

export function KpiGrid({ period }: { period: DashboardPeriod }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard', 'overview', period],
    queryFn: () => fetchDashboardOverview(period),
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter mb-gutter">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div
            key={i}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 h-[120px] animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-error-container/20 border border-error text-error rounded-xl p-4 mb-gutter font-body-sm text-body-sm">
        Falha ao carregar KPIs. Confirme que o backend está rodando em{' '}
        <code className="bg-surface-container px-1 rounded">{env.apiUrl}</code>.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter mb-gutter">
      {data.metrics.map((metric) => (
        <KpiCard key={metric.key} metric={metric} />
      ))}
    </div>
  )
}
