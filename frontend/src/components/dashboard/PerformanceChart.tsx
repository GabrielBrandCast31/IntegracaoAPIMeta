import { useQuery } from '@tanstack/react-query'
import { fetchPlatformPerformance } from '../../api/dashboard'
import type { DashboardPeriod, PlatformSeries } from '../../types/api'

const VIEW_WIDTH = 800
const VIEW_HEIGHT = 220

function buildPath(points: PlatformSeries['points'], max: number): string {
  if (points.length === 0) return ''
  const denom = points.length > 1 ? points.length - 1 : 1
  const stepX = VIEW_WIDTH / denom
  return points
    .map((p, i) => {
      const x = i * stepX
      const y = max === 0 ? VIEW_HEIGHT : VIEW_HEIGHT - (p.value / max) * VIEW_HEIGHT
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

export function PerformanceChart({ period }: { period: DashboardPeriod }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard', 'platform-performance', period],
    queryFn: () => fetchPlatformPerformance(period),
  })

  const maxValue = data
    ? Math.max(...data.series.flatMap((s) => s.points.map((p) => p.value)), 1)
    : 1

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-gutter h-[320px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-headline-md text-headline-md text-on-background">
          Performance por Plataforma
        </h3>
        <div className="flex gap-4">
          {data?.series.map((s) => (
            <div key={s.platform} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden="true"
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 border-t border-l border-outline-variant relative mt-2">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none flex flex-col justify-between py-4"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-full border-t border-surface-container-low" />
          ))}
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant font-body-sm text-body-sm">
            Carregando…
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-error font-body-sm text-body-sm">
            Falha ao carregar série temporal
          </div>
        )}

        {data && (
          <svg
            role="img"
            aria-label="Comparativo de performance Meta Ads vs Google Ads"
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            preserveAspectRatio="none"
          >
            {data.series.map((s, idx) => (
              <path
                key={s.platform}
                d={buildPath(s.points, maxValue)}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeDasharray={idx === 1 ? '4' : undefined}
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  )
}
