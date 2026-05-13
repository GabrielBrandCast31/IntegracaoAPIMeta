from fastapi import APIRouter

from app.schemas.alert import AlertsResponse
from app.services import mock_data

router = APIRouter()


@router.get("", response_model=AlertsResponse)
def list_alerts() -> AlertsResponse:
    return mock_data.alerts()
