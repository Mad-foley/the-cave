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


<<<<<<< HEAD
@router.get('/usersapi/users', response_model=UserOut)
=======
@router.get('/api/users')
>>>>>>> d12a81f58a141aa413ac5a82609c35c94b4d2a77
def get_all_users(
    repo: UserQueries = Depends()
):
    return repo.get_all_users()

@router.post('/api/users')
def create_user(
    user: UserIn,
    repo: UserQueries = Depends()
):
    repo.create_user(user)
    return user
