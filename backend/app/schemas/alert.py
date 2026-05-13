from enum import Enum

from pydantic import BaseModel


class AlertSeverity(str, Enum):
    CRITICAL = "critical"
    WARNING = "warning"
    INFO = "info"


class Alert(BaseModel):
    id: str
    severity: AlertSeverity
    icon: str
    title: str
    description: str
    action_label: str | None = None
    action_href: str | None = None


class AlertsResponse(BaseModel):
    items: list[Alert]
    critical_count: int
