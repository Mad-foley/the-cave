from fastapi import APIRouter, Depends
from queries.wines import WineIn, WineOut, WineQueries
from queries.users import Error
from queries.logs import LogQueries
from authenticator import authenticator
from typing import List, Union, Optional
from queries.likes import LikeQueries

router = APIRouter()


@router.get('/api/wines', response_model=Union[List[WineOut], Error])
def get_all_wines(
    repo: WineQueries = Depends(),
):
    return repo.get_all_wines()


@router.post('/api/wines', response_model=Union[WineOut, Error])
def create_wine(
    wine: WineIn,
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends(),
    log: LogQueries = Depends()
):
    if account_data:
        # Save the WineOut object into results
        result = repo.create_wine(wine, account_data['id'])
        # Construct log message
        message = (f"{account_data['name']} added "
                   f"{result.dict()['name']} to the database")
        # Querie the log table to create a new log
        log.create_log(account_data['id'], message)
        # Return the WineOut object
        return result
    else:
        return Error(message="You aren't logged in")


@router.put('/api/wines/{wine_id}', response_model=Union[WineOut, Error])
def update_wine(
    wine_id: int,
    wine: WineIn,
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends(),
    log: LogQueries = Depends()
):
    if account_data:
        result = repo.update_wine(wine_id, wine)
        message = f"{account_data['name']} updated {result.dict()['name']}"
        log.create_log(account_data['id'], message)
        return result
    else:
        return Error(message="You aren't logged in")


@router.get('/api/wines/{wine_id}', response_model=Union[WineOut, Error])
def get_wine_by_id(
    wine_id: int,
    repo: WineQueries = Depends()
):
    return repo.get_wine_by_id(wine_id)


@router.delete('/api/wines/{wine_id}')
def delete_wine(
    wine_id: int,
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends(),
    log: LogQueries = Depends()
):
    if account_data:
        result = repo.delete_wine(wine_id)
        message = f"{account_data['name']} deleted: {result}"
        log.create_log(account_data['id'], message)
        return {'message': f'Successfully deleted: {result}'}
    else:
        return Error(message="You aren't logged in")


@router.get('/api/users/{user_id}/wines',
            response_model=Union[List[WineOut], Error])
def get_wine_by_user(
    user_id: int,
    repo: WineQueries = Depends()
):
    return repo.get_wine_by_user(user_id)


@router.get('/api/wines/filter/{query}',
            response_model=Union[List[WineOut], Error])
def filter_by(
    query: str,
    repo: WineQueries = Depends()
):
    return repo.filter_by(query)


@router.get('/api/wines/favorites/',
            response_model=Union[List[WineOut], Error])
def wines_by_likes(
    wine_repo: WineQueries = Depends(),
    like_repo: LikeQueries = Depends(),
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        likes = like_repo.get_likes_by_user(account_data['id'])
        return [wine_repo.get_wine_by_id(like.wine_id) for like in likes]
    return {"message": "Failed to get favorite wines"}
