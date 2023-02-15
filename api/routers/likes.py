from fastapi import APIRouter, Depends
from queries.users import Error
from typing import List, Union, Optional
from authenticator import authenticator
from queries.likes import LikeIn, LikeQueries
router = APIRouter()


@router.get('/api/wines/{wine_id}/likes')
def get_likes_by_wine(
    wine_id: int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: LikeQueries = Depends()
):
    print(account_data)
    if account_data:
        return repo.get_likes_by_wine(wine_id)
    else:
       return Error(message = "Your aren't logged in")

@router.get('/api/wines/{wine_id}/likes')
def get_likes_by_user(
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: LikeQueries = Depends()
):
    if account_data:
        return repo.get_likes_by_user(account_data['id'])
    else:
       return Error(message = "Your aren't logged in")

@router.post('/api/wines/{wine_id}/likes')
def create_like(
    wine_id: int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: LikeQueries = Depends()
):
    if account_data:
        return repo.create_like(wine_id, account_data['id'])
    else:
       return Error(message = "Your aren't logged in")

@router.delete('/api/wines/{wine_id}/likes')
def delete_like(
    wine_id: int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: LikeQueries = Depends()
):
    if account_data:
        return repo.delete_like(wine_id, account_data['id'])
    else:
       return Error(message = "Your aren't logged in")
