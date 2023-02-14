from fastapi import APIRouter, Depends
from queries.users import UserQueries, UserIn, UserOut, Error
from typing import List, Union

router = APIRouter()

@router.get('/api/users', response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserQueries = Depends()
):
    return repo.get_all_users()

@router.post('/api/users', response_model=Union[UserOut, Error])
def create_user(
    user: UserIn,
    repo: UserQueries = Depends()
):
    return repo.create_user(user)

@router.get('/api/users/{user_id}', response_model=Union[UserOut, Error])
def get_user(
    user_id: int,
    repo: UserQueries = Depends()
):
    return repo.get_user_by_id(user_id)

@router.delete('/api/users/{user_id}')
def delete_user(
    user_id: int,
    repo: UserQueries = Depends()
):
    return repo.delete_user(user_id)

@router.put('/api/users/{user_id}', response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserIn,
    repo: UserQueries = Depends()
):
    return repo.update_user(user, user_id)
