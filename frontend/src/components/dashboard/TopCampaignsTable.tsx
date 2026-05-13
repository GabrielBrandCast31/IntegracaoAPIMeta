import { useQuery } from '@tanstack/react-query'
import { fetchTopCampaigns } from '../../api/campaigns'

export function TopCampaignsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['campaigns', 'top', 4],
    queryFn: () => fetchTopCampaigns(4),
  })

  return (
    <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-outline-variant bg-surface-bright">
        <h3 className="font-headline-md text-headline-md text-on-background">Top Campanhas</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface border-b border-outline-variant">
              <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                Campanha
              </th>
              <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                Plataforma
              </th>
              <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">
                Gasto
              </th>
              <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">
                Conv.
              </th>
              <th className="py-2 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">
                CPA
              </th>
            </tr>
          </thead>
          <tbody className="font-table-data text-table-data text-on-background">
            {isLoading && (
              <tr>
                <td colSpan={5} className="py-6 px-4 text-center text-on-surface-variant">
                  Carregando…
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={5} className="py-6 px-4 text-center text-error">
                  Falha ao carregar campanhas
                </td>
              </tr>
            )}
            {data?.items.map((c, idx) => (
              <tr
                key={c.id}
                className={`hover:bg-surface-container transition-colors ${
                  idx < data.items.length - 1 ? 'border-b border-surface-container-low' : ''
                }`}
              >
                <td className="py-3 px-4 text-on-surface font-semibold">{c.name}</td>
                <td className="py-3 px-4 text-on-surface-variant">{c.platform_label}</td>
                <td className="py-3 px-4 text-right">{c.spend_display}</td>
                <td className="py-3 px-4 text-right">
                  {c.conversions.toLocaleString('pt-BR')}
                </td>
                <td className="py-3 px-4 text-right text-primary">{c.cpa_display}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
