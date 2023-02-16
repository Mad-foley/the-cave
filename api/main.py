from fastapi import FastAPI, APIRouter, Depends, Query
from routers import users, wines, likes, comments
from queries.sampleapis import SampleApiWineQueries, SampleWineOut
from queries.users import Error
from queries.foodapis import WinePairingOut, WinePairingQueries
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
import os
from typing import List, Union

app = FastAPI()
router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(authenticator.router, tags=['Login / Logout'])
app.include_router(users.router, tags=['Users'])
app.include_router(wines.router, tags=['Wines'])
app.include_router(likes.router, tags=['Likes'])
app.include_router(comments.router, tags=['Comments'])


@app.get('/api/sampleapi/wines', response_model=List[SampleWineOut] | Error, tags=['Public APIs'])
def get_port_wine(
        type: str = Query(description="reds, whites, sparkling, dessert, port"),
        repo: SampleApiWineQueries = Depends()
):
    return repo.get_wines(type)

@app.get('/api/foodapis', tags=['Food'])
def get_wine_pairing(
    food: str,
    repo: WinePairingQueries = Depends()
):
    return repo.get_wine_pairing(food)
