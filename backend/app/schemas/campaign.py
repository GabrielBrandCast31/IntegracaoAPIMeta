from pydantic import BaseModel

from .dashboard import Platform


class TopCampaign(BaseModel):
    id: str
    name: str
    platform: Platform
    platform_label: str
    spend_display: str
    conversions: int
    cpa_display: str


class TopCampaignsResponse(BaseModel):
    items: list[TopCampaign]
