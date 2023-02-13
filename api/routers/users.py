from fastapi import APIRouter, Depends
from pydantic import BaseModel
from queries.db import UserQueries


router = APIRouter()

class UserIn(BaseModel):
    name: str
    username: str
    password: str
    birthday: str
    email: str
    picture_url: str

class UserOut(UserIn):
    id: int


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
