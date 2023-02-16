from fastapi import APIRouter, Depends
from queries.wines import WineIn, WineOut, WineQueries
from queries.users import Error
from typing import List, Union, Optional
from authenticator import authenticator
router = APIRouter()


@router.get('/api/wines', response_model=Union[List[WineOut], Error])
def get_all_wines(
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data), #get user id from account data
    repo: WineQueries = Depends()
):
    if account_data:
        print("****************************** account data")
        print(account_data['id'])
        return repo.get_all_wines()
    else:
       return Error(message = "You aren't logged in")

@router.post('/api/wines', response_model=Union[WineOut, Error])
def create_wine(
    wine: WineIn,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends()
):
    result = repo.create_wine(wine)
    if account_data:
        return repo.create_wine(wine, account_data['id'])
    else:
       return Error(message = "You aren't logged in")

@router.put('/api/wines/{wine_id}', response_model=Union[WineOut, Error])
def update_wine(
    wine_id: int,
    wine: WineIn,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends()
):
    if account_data:
        return repo.update_wine(wine_id, wine)
    else:
       return Error(message = "You aren't logged in")

@router.get('/api/wines/{wine_id}', response_model=Union[WineOut, Error])
def get_wine_by_id(
    wine_id: int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends()
):
    if account_data:
        return repo.get_wine_by_id(wine_id)
    else:
       return Error(message = "You aren't logged in")

@router.delete('/api/wines/{wine_id}')
def delete_wine(
    wine_id: int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends()
):
    if account_data:
        return repo.delete_wine(wine_id)
    else:
       return Error(message = "You aren't logged in")

@router.get('/api/users/{user_id}/wines', response_model=Union[List[WineOut], Error])
def get_wine_by_user(
    user_id:int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends()
):
    if account_data:
        return repo.get_wine_by_user(user_id)
    else:
        return Error(message="You aren't logged in")

@router.get('/api/wines/filter/{query}')
def filter_by(
    query: str,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends()
):
    if account_data:
        return repo.filter_by(query)
    else:
        return Error(message="You aren't logged in")
