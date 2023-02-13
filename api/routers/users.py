from pydantic import BaseModel
from fastapi import APIRouter
from db import UserQueries

router = APIRouter(
    prefix='/api/users',
    responses={404: {"message": "user not found"}}
)

class UserIn(BaseModel):
    name: str
    username: str
    password: str
    birthday: str
    email: str
    picture_url: str

class UserOut(UserIn):
    id: int


@router.get('/', response_model=UserOut)
def list_all_users():
    users = UserQueries
    return users.get_all_users()
