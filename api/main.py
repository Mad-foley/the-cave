import os
from fastapi import FastAPI, APIRouter, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from routers import users, wines, likes, comments, logs
from queries.sampleapis import SampleApiWineQueries, SampleWineOut
from queries.users import Error
from queries.foodapis import WinePairingOut, WinePairingQueries
from queries.wines import WineQueries, WineOut
from authenticator import authenticator
from typing import List
from random import randint

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


@app.get('/api/pairings', response_model=List[WineOut | WinePairingOut]
         | Error, tags=['Food Pairing API'])
def get_wine_pairing(
    query: str = Query(description="ex: Pasta Bolognese, Cement, Ramen"),
    repo: WinePairingQueries = Depends(),
    wines: WineQueries = Depends()
):
    try:
        # Save the public API food pairing results
        result = repo.get_wine_pairing(query)
        # Create a new list for potential matches
        # Query the wines database for any wines matching suggested wine names
        # If there are matches, generate a random index based on the
        # length of the matching wines
        # Get a random wine out of the list of matches
        # If there are no matches, use the default
        # suggestion from the public API
        return [
            (wines.filter_by(suggestion.name)
             [randint(0, len(wines.filter_by(suggestion.name))-1)])
            if wines.filter_by(suggestion.name)
            else suggestion
            for suggestion in result]
    except Exception as e:
        print(e)
        return {'message': 'Failed to get pairings'}
