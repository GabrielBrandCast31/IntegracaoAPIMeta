import { useQuery } from '@tanstack/react-query'
import { fetchAlerts } from '../../api/alerts'
import type { Alert } from '../../types/api'

interface SeverityStyle {
  iconClass: string
  containerClass: string
  actionClass: string
}

function severityStyle(severity: Alert['severity']): SeverityStyle {
  if (severity === 'critical') {
    return {
      iconClass: 'text-error',
      containerClass: 'border-error-container bg-error-container/10',
      actionClass: 'text-primary',
    }
  }
  if (severity === 'warning') {
    return {
      iconClass: 'text-sentiment-warning',
      containerClass: 'border-outline-variant bg-surface-container-lowest',
      actionClass: 'text-secondary',
    }
  }
  return {
    iconClass: 'text-primary',
    containerClass: 'border-outline-variant bg-surface-container-lowest',
    actionClass: 'text-primary',
  }
}

export function AlertsPanel() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
  })

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col">
      <div className="p-4 border-b border-outline-variant bg-surface-bright flex justify-between items-center">
        <h3 className="font-headline-md text-headline-md text-on-background">Alertas</h3>
        {data && data.critical_count > 0 && (
          <span className="bg-error-container text-on-error-container font-label-caps text-label-caps px-2 py-0.5 rounded-full">
            {data.critical_count} {data.critical_count === 1 ? 'Crítico' : 'Críticos'}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3">
        {isLoading && (
          <div className="text-on-surface-variant font-body-sm text-body-sm">
            Carregando alertas…
          </div>
        )}
        {error && (
          <div className="text-error font-body-sm text-body-sm">Falha ao carregar alertas</div>
        )}
        {data?.items.map((alert) => {
          const styles = severityStyle(alert.severity)
          return (
            <div
              key={alert.id}
              className={`p-3 border rounded-lg flex items-start gap-3 ${styles.containerClass}`}
            >
              <span className={`material-symbols-outlined mt-0.5 ${styles.iconClass}`}>
                {alert.icon}
              </span>
              <div>
                <h4 className="font-body-md text-body-md font-semibold text-on-background">
                  {alert.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {alert.description}
                </p>
                {alert.action_label && (
                  <a
                    href={alert.action_href ?? '#'}
                    className={`mt-2 inline-block font-body-sm text-body-sm font-semibold hover:underline ${styles.actionClass}`}
                  >
                    {alert.action_label}
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
