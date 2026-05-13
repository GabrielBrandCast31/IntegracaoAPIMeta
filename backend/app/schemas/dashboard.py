from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class DashboardPeriod(str, Enum):
    LAST_7_DAYS = "last_7_days"
    LAST_30_DAYS = "last_30_days"
    THIS_MONTH = "this_month"


class MetricKey(str, Enum):
    INVESTMENT = "investment"
    CLICKS = "clicks"
    CTR = "ctr"
    CPC = "cpc"
    CONVERSIONS = "conversions"
    ROAS = "roas"


class DeltaTrend(str, Enum):
    UP = "up"
    DOWN = "down"
    FLAT = "flat"


class Sentiment(str, Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    NEUTRAL = "neutral"


class Platform(str, Enum):
    META = "meta"
    GOOGLE = "google"


class KpiMetric(BaseModel):
    key: MetricKey
    label: str
    icon: str = Field(description="Material Symbols icon name")
    value_display: str = Field(description="Pre-formatted display value, locale-aware (pt-BR)")
    delta_display: str
    delta_trend: DeltaTrend
    delta_sentiment: Sentiment


class DashboardOverview(BaseModel):
    period: DashboardPeriod
    metrics: list[KpiMetric]


class TimeSeriesPoint(BaseModel):
    timestamp: datetime
    value: float


class PlatformSeries(BaseModel):
    platform: Platform
    label: str
    color: str = Field(description="Hex color including #")
    points: list[TimeSeriesPoint]


class PlatformPerformance(BaseModel):
    period: DashboardPeriod
    series: list[PlatformSeries]
