from fastapi import APIRouter, Depends
from queries.db import UserQueries, UserIn, UserOut
from typing import List

router = APIRouter()

@router.get('/api/users', response_model=List[UserOut])
def get_all_users(
    repo: UserQueries = Depends()
):
    return repo.get_all_users()

@router.post('/api/users', response_model=UserOut)
def create_user(
    user: UserIn,
    repo: UserQueries = Depends()
):
    return repo.create_user(user)

@router.get('/api/users/{user_id}', response_model=UserOut)
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

@router.put('/api/users/{user_id}')
def update_user(
    user_id: int,
    user: UserIn,
    repo: UserQueries = Depends()
):
    return repo.update_user(user, user_id)
