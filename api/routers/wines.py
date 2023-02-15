from fastapi import APIRouter, Depends
from queries.wines import WineIn, WineOut, WineQueries
from queries.users import Error
from typing import List, Union, Optional
from authenticator import authenticator
<<<<<<< HEAD
=======

>>>>>>> 329f0ea85941a0840c5ec117815bceff0b50c9cd
router = APIRouter()


@router.get('/api/wines', response_model=Union[List[WineOut], Error])
def get_all_wines(
<<<<<<< HEAD
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
=======
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
>>>>>>> 329f0ea85941a0840c5ec117815bceff0b50c9cd
    repo: WineQueries = Depends()
):
    if account_data:
        return repo.get_all_wines()
    else:
       return Error(message = "Your aren't logged in")

@router.post('/api/wines', response_model=Union[WineOut, Error])
def create_wine(
    wine: WineIn,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: WineQueries = Depends()
):
    if account_data:
        return repo.create_wine(wine)
    else:
       return Error(message = "Your aren't logged in")
