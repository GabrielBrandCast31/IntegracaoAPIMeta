from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore", case_sensitive=False)

    environment: Literal["development", "staging", "production"] = "development"
    api_v1_prefix: str = "/api/v1"

    database_url: str = "postgresql+asyncpg://brandcast:brandcast_dev@localhost:5432/brandcast"
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = "change-me-openssl-rand-base64-32"
    cors_origins: str = "http://localhost:5173"

    meta_app_id: str = ""
    meta_app_secret: str = ""
    meta_redirect_uri: str = "http://localhost:8000/auth/meta/callback"

    google_client_id: str = ""
    google_client_secret: str = ""
    google_redirect_uri: str = "http://localhost:8000/auth/google/callback"
    google_ads_developer_token: str = ""

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
