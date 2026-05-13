from fastapi.testclient import TestClient

from main import app


def test_root_returns_metadata():
    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 200
        body = response.json()
        assert body["name"] == "Brandcast Flow API"


def test_health_endpoint_ok():
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        body = response.json()
        assert body["status"] == "ok"


def test_dashboard_overview_returns_six_metrics():
    with TestClient(app) as client:
        response = client.get("/api/v1/dashboard/overview")
        assert response.status_code == 200
        body = response.json()
        assert body["period"] == "last_30_days"
        assert len(body["metrics"]) == 6
        keys = {metric["key"] for metric in body["metrics"]}
        assert keys == {"investment", "clicks", "ctr", "cpc", "conversions", "roas"}


def test_platform_performance_has_meta_and_google():
    with TestClient(app) as client:
        response = client.get("/api/v1/dashboard/platform-performance")
        assert response.status_code == 200
        body = response.json()
        platforms = {series["platform"] for series in body["series"]}
        assert platforms == {"meta", "google"}


def test_top_campaigns_default_limit_is_four():
    with TestClient(app) as client:
        response = client.get("/api/v1/campaigns/top")
        assert response.status_code == 200
        body = response.json()
        assert len(body["items"]) == 4


def test_alerts_returns_critical_count():
    with TestClient(app) as client:
        response = client.get("/api/v1/alerts")
        assert response.status_code == 200
        body = response.json()
        assert body["critical_count"] >= 1
        assert any(item["severity"] == "critical" for item in body["items"])
