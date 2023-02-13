from fastapi import APIRouter, Depends
from queries.db import UserQueries, UserIn, UserOut


router = APIRouter()


@router.get('/api/users')
def get_all_users(
    repo: UserQueries = Depends()
):
    return repo.get_all_users()

@router.post('/api/users')
def create_user(
    user: UserIn,
    repo: UserQueries = Depends()
):
    return repo.create_user(user)
