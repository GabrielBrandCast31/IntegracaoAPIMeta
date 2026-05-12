
from fastapi import FastAPI 
from fastapi.cli import TestClient
from main import app





def test_hello_world():

    with TestClient(app) as client:
        response = client.get("/")
        assert response.status_code == 200
