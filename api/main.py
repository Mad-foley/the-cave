import os
from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from routers import users, wines, likes, comments, logs, socket
from queries.sampleapis import SampleApiWineQueries, SampleWineOut
from queries.users import Error
from authenticator import authenticator
from typing import List

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

# Application routes
app.include_router(authenticator.router, tags=['Login / Logout'])
app.include_router(users.router, tags=['Users'])
app.include_router(wines.router, tags=['Wines'])
app.include_router(likes.router, tags=['Likes'])
app.include_router(comments.router, tags=['Comments'])
app.include_router(logs.router, tags=['Logs'])
app.include_router(socket.router)


# Public API routes
@app.get('/api/sampleapi/wines', response_model=List[SampleWineOut]
         | Error, tags=['Sample API Wines'])
def get_wines(
        type: str = Query("reds", enum=["reds", "whites",
                          "sparkling", "dessert", "port"]),
        repo: SampleApiWineQueries = Depends()
):
    return repo.get_wines(type)


@app.get('/api/sampleapi/wines/{id}', response_model=SampleWineOut
         | Error, tags=['Sample API Wines'])
def get_wine_by_id(
        id: int,
        type: str = Query("reds", enum=["reds", "whites",
                          "sparkling", "dessert", "port"]),
        repo: SampleApiWineQueries = Depends()
):
    return repo.get_wine_by_id(type, id)
