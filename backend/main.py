from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import api_router
from app.config import get_settings

settings = get_settings()

app = FastAPI(
    title="Brandcast Flow API",
    version="0.1.0",
    description=(
        "SaaS para agências gerenciarem campanhas de tráfego pago "
        "(Meta Ads e Google Ads) — criação, aprovação por link público, "
        "publicação automática e métricas."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["meta"])
def root() -> dict[str, str]:
    return {"name": "Brandcast Flow API", "version": "0.1.0"}


@app.get("/health", tags=["meta"])
def health() -> dict[str, str]:
    return {"status": "ok", "environment": settings.environment}


app.include_router(api_router, prefix=settings.api_v1_prefix)
