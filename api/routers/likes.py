from fastapi import APIRouter, Depends
from models.like_models import LikeOut
from queries.likes import LikeQueries
from queries.users import Error
from queries.logs import LogQueries
from queries.wines import WineQueries
from authenticator import authenticator
from typing import Optional, List, Union


router = APIRouter()


@router.get('/api/likes')
def get_all_likes(
    repo: LikeQueries = Depends()
):
    return repo.get_all_likes()


@router.get('/api/wines/{wine_id}/likes',
            response_model=Union[List[LikeOut], Error])
def get_likes_by_wine(
    wine_id: int,
    repo: LikeQueries = Depends()
):
    return repo.get_likes_by_wine(wine_id)


@router.get('/api/user/me/likes',
            response_model=Union[List[LikeOut], Error])
def get_likes_by_user(
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: LikeQueries = Depends()
):
    if account_data:
        return repo.get_likes_by_user(account_data['id'])
    else:
        return Error(message="You aren't logged in")


@router.post('/api/wines/{wine_id}/likes',
             response_model=Union[LikeOut, Error])
def create_like(
    wine_id: int,
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: LikeQueries = Depends(),
    wine_repo: WineQueries = Depends(),
    log: LogQueries = Depends()
):
    if account_data:
        result = repo.create_like(wine_id, account_data['id'])
        wine = wine_repo.get_wine_by_id(wine_id)
        message = f"{account_data['name']} liked {wine.name}"
        log.create_log(account_data['id'], message)
        return result

    else:
        return Error(message="You aren't logged in")


@router.delete('/api/wines/{wine_id}/likes')
def delete_like(
    wine_id: int,
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: LikeQueries = Depends(),
    wine_repo: WineQueries = Depends(),
    log: LogQueries = Depends()
):
    if account_data:
        result = repo.delete_like(wine_id, account_data['id'])
        wine = wine_repo.get_wine_by_id(wine_id)
        message = f"{account_data['name']} unliked{wine.name}"
        log.create_log(account_data['id'], message)
        return result
    else:
        return Error(message="You aren't logged in")
