from datetime import datetime, timedelta, timezone

from app.schemas.alert import Alert, AlertSeverity, AlertsResponse
from app.schemas.campaign import TopCampaign, TopCampaignsResponse
from app.schemas.dashboard import (
    DashboardOverview,
    DashboardPeriod,
    DeltaTrend,
    KpiMetric,
    MetricKey,
    Platform,
    PlatformPerformance,
    PlatformSeries,
    Sentiment,
    TimeSeriesPoint,
)

META_BLUE = "#1877F2"
GOOGLE_RED = "#EA4335"


def overview(period: DashboardPeriod) -> DashboardOverview:
    metrics = [
        KpiMetric(
            key=MetricKey.INVESTMENT,
            label="Investimento Total",
            icon="payments",
            value_display="R$ 45k",
            delta_display="12%",
            delta_trend=DeltaTrend.UP,
            delta_sentiment=Sentiment.POSITIVE,
        ),
        KpiMetric(
            key=MetricKey.CLICKS,
            label="Cliques",
            icon="ads_click",
            value_display="125k",
            delta_display="8.4%",
            delta_trend=DeltaTrend.UP,
            delta_sentiment=Sentiment.POSITIVE,
        ),
        KpiMetric(
            key=MetricKey.CTR,
            label="CTR Médio",
            icon="data_exploration",
            value_display="2.4%",
            delta_display="0.2%",
            delta_trend=DeltaTrend.DOWN,
            delta_sentiment=Sentiment.NEGATIVE,
        ),
        KpiMetric(
            key=MetricKey.CPC,
            label="CPC Médio",
            icon="attach_money",
            value_display="R$ 0,36",
            delta_display="R$ 0,04",
            delta_trend=DeltaTrend.DOWN,
            delta_sentiment=Sentiment.POSITIVE,
        ),
        KpiMetric(
            key=MetricKey.CONVERSIONS,
            label="Conversões",
            icon="shopping_cart",
            value_display="4.230",
            delta_display="15%",
            delta_trend=DeltaTrend.UP,
            delta_sentiment=Sentiment.POSITIVE,
        ),
        KpiMetric(
            key=MetricKey.ROAS,
            label="ROAS",
            icon="monitoring",
            value_display="3,2x",
            delta_display="0,5x",
            delta_trend=DeltaTrend.UP,
            delta_sentiment=Sentiment.POSITIVE,
        ),
    ]
    return DashboardOverview(period=period, metrics=metrics)


def _series(start: datetime, values: list[float]) -> list[TimeSeriesPoint]:
    return [
        TimeSeriesPoint(timestamp=start + timedelta(days=i), value=value)
        for i, value in enumerate(values)
    ]


def platform_performance(period: DashboardPeriod) -> PlatformPerformance:
    start = datetime.now(tz=timezone.utc) - timedelta(days=8)
    return PlatformPerformance(
        period=period,
        series=[
            PlatformSeries(
                platform=Platform.META,
                label="Meta Ads",
                color=META_BLUE,
                points=_series(
                    start,
                    [4200, 5100, 3400, 6800, 4900, 7500, 6100, 8200, 7000],
                ),
            ),
            PlatformSeries(
                platform=Platform.GOOGLE,
                label="Google Ads",
                color=GOOGLE_RED,
                points=_series(
                    start,
                    [2100, 2400, 3600, 3100, 5200, 4800, 6800, 6300, 9100],
                ),
            ),
        ],
    )


def top_campaigns(limit: int = 4) -> TopCampaignsResponse:
    items = [
        TopCampaign(
            id="cmp_001",
            name="Q3_Retargeting_All",
            platform=Platform.META,
            platform_label="Meta",
            spend_display="R$ 12.450",
            conversions=845,
            cpa_display="R$ 14,73",
        ),
        TopCampaign(
            id="cmp_002",
            name="Search_Brand_BR",
            platform=Platform.GOOGLE,
            platform_label="Google",
            spend_display="R$ 8.120",
            conversions=1204,
            cpa_display="R$ 6,74",
        ),
        TopCampaign(
            id="cmp_003",
            name="Promo_MothersDay_Video",
            platform=Platform.META,
            platform_label="Meta",
            spend_display="R$ 5.300",
            conversions=312,
            cpa_display="R$ 16,98",
        ),
        TopCampaign(
            id="cmp_004",
            name="PMax_BestSellers",
            platform=Platform.GOOGLE,
            platform_label="Google",
            spend_display="R$ 15.600",
            conversions=980,
            cpa_display="R$ 15,91",
        ),
    ]
    return TopCampaignsResponse(items=items[:limit])


def alerts() -> AlertsResponse:
    items = [
        Alert(
            id="alert_token_meta_001",
            severity=AlertSeverity.CRITICAL,
            icon="error",
            title="Token Meta Expirado",
            description="Conta 'AdAccount_BR' desconectada. Campanhas pausadas.",
            action_label="Reconectar",
            action_href="/connections/meta",
        ),
        Alert(
            id="alert_budget_001",
            severity=AlertSeverity.WARNING,
            icon="warning",
            title="Orçamento Esgotando",
            description="Campanha 'Search_Brand_BR' atingirá limite diário em 2h.",
            action_label="Ver detalhes",
            action_href="/campaigns/cmp_002",
        ),
    ]
    critical = sum(1 for item in items if item.severity is AlertSeverity.CRITICAL)
    return AlertsResponse(items=items, critical_count=critical)
