from fastapi import APIRouter, Depends, Response, Request
from queries.users import UserQueries, UserIn, UserOut, Error
from typing import List, Union
from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: UserOut

class HttpError(BaseModel):
    detail: str


router = APIRouter()

@router.get('/api/users', response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserQueries = Depends()
):
    return repo.get_all_users()

# @router.post('/api/users', response_model=Union[UserOut, Error])
# def create_user(
#     user: UserIn,
#     repo: UserQueries = Depends()
# ):
#     return repo.create_user(user)

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

@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    account = repo.create_user(info, hashed_password)

    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
