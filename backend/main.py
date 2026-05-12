from fastapi import FastAPI

app -= FastAPI()
@app.get("/")
def read_droot():
    return {"Hello": "World"}