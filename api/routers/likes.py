from fastapi import APIRouter, Depends
from queries.users import Error
from typing import List, Union, Optional
from authenticator import authenticator
from queries.likes import LikeIn, LikeQueries
router = APIRouter()


@router.get('/api/wines/{wine_id}/likes')
def get_likes_by_wine(
    wine_id: int,
    repo: LikeQueries = Depends()
):
    return repo.get_likes_by_wine(wine_id)

@router.post('/api/wines/{wine_id}/likes')
def create_like(
    wine_id: int,
    repo: LikeQueries = Depends()
):
    return repo.create_like(wine_id)
