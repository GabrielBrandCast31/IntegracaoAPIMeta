from fastapi import APIRouter, Query

from app.schemas.campaign import TopCampaignsResponse
from app.services import mock_data

router = APIRouter()


@router.get("/top", response_model=TopCampaignsResponse)
def get_top_campaigns(limit: int = Query(default=4, ge=1, le=20)) -> TopCampaignsResponse:
    return mock_data.top_campaigns(limit=limit)
