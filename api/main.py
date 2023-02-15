from fastapi import FastAPI, APIRouter, Depends, Query
from routers import users, wines, likes, comments
from queries.sampleapis import SampleApiWineQueries, SampleWineOut
from queries.users import Error
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


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2022,
            "month": 12,
            "day": "9",
            "hour": 19,
            "min": 0,
            "tz:": "PST"
        }
    }

app.include_router(users.router, tags=['Users'])
app.include_router(wines.router, tags=['Wines'])
app.include_router(authenticator.router, tags=['Accounts'])
app.include_router(likes.router, tags=['Likes'])
app.include_router(comments.router, tags=['Comments'])


@app.get('/api/sampleapi/wines', response_model=List[SampleWineOut] | Error)
def get_port_wine(
        type: str = Query(
    description="reds, whites, sparkling, dessert, port"
    ),
        repo: SampleApiWineQueries = Depends()
):
    if type == 'port':
        return repo.get_port_wines()
    elif type == 'reds':
        return repo.get_red_wines()
    elif type == 'whites':
        return repo.get_white_wines()
    elif type == 'dessert':
        return repo.get_dessert_wines()
    elif type == 'sparkling':
        return repo.get_sparkling_wines()
    else:
        return Error(
            message="Could not get wines from Sample API Wines"
        )
