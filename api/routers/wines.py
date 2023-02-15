from fastapi import APIRouter, Depends
from queries.wines import WineIn, WineOut, WineQueries
from queries.users import Error
from typing import List, Union, Optional
from authenticator import authenticator
router = APIRouter()


@router.get('/api/wines', response_model=Union[List[WineOut], Error])
def get_all_wines(
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends()
):
    return repo.get_all_wines()

@router.post('/api/wines', response_model=Union[WineOut, Error])
def create_wine(
    wine: WineIn,
    repo: WineQueries = Depends()
):
    return repo.create_wine(wine)
