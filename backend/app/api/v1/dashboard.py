from fastapi import APIRouter

from app.schemas.dashboard import DashboardOverview, DashboardPeriod, PlatformPerformance
from app.services import mock_data

router = APIRouter()


@router.get("/overview", response_model=DashboardOverview)
def get_overview(period: DashboardPeriod = DashboardPeriod.LAST_30_DAYS) -> DashboardOverview:
    return mock_data.overview(period)


@router.get("/platform-performance", response_model=PlatformPerformance)
def get_platform_performance(
    period: DashboardPeriod = DashboardPeriod.LAST_30_DAYS,
) -> PlatformPerformance:
    return mock_data.platform_performance(period)
