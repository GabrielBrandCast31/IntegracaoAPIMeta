import { useState } from 'react'
import { AlertsPanel } from '../components/dashboard/AlertsPanel'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { PerformanceChart } from '../components/dashboard/PerformanceChart'
import { TopCampaignsTable } from '../components/dashboard/TopCampaignsTable'
import type { DashboardPeriod } from '../types/api'

const periodLabel: Record<DashboardPeriod, string> = {
  last_7_days: 'Últimos 7 dias',
  last_30_days: 'Últimos 30 dias',
  this_month: 'Este mês',
}

export function DashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriod>('last_30_days')

  return (
    <main className="flex-1 p-gutter overflow-y-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">
            Performance Geral
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Visão consolidada de todas as plataformas.
          </p>
        </div>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="period-select">
            Período
          </label>
          <select
            id="period-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value as DashboardPeriod)}
            className="py-1.5 px-3 bg-surface-container-lowest border border-outline-variant rounded-md font-body-sm text-body-sm text-on-surface focus:border-primary outline-none"
          >
            {(Object.keys(periodLabel) as DashboardPeriod[]).map((p) => (
              <option key={p} value={p}>
                {periodLabel[p]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <KpiGrid period={period} />
      <PerformanceChart period={period} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <TopCampaignsTable />
        <AlertsPanel />
      </div>
    </main>
  )
}
