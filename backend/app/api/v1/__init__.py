from fastapi import APIRouter

from .alerts import router as alerts_router
from .campaigns import router as campaigns_router
from .dashboard import router as dashboard_router

api_router = APIRouter()
api_router.include_router(dashboard_router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(campaigns_router, prefix="/campaigns", tags=["campaigns"])
api_router.include_router(alerts_router, prefix="/alerts", tags=["alerts"])
