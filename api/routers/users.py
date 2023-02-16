from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status
)
from queries.users import (
    UserQueries,
    UserIn,
    UserOut,
    Error,
    UserToken,
    UserForm,
    UserOutWithPassword,
    DuplicateUserError,
    TokenResponse
)
from typing import List, Union
from authenticator import authenticator


router = APIRouter()

@router.get('/api/users', response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserQueries = Depends()
):
    return repo.get_all_users()

@router.post('/api/users', response_model=Union[TokenResponse, Error])
async def create_user(
    user: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends()
):
    hashed_password = authenticator.hash_password(user.password)
    try:
        result = repo.create_user(user, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials"
        )
    form = UserForm(username=user.username, password=user.password)
    token = await authenticator.login(response, request, form, repo)
    return UserToken(user=result, **token.dict())

@router.get('/api/users/{user_id}', response_model=Union[UserOut, Error])
def get_user_by_id(
    user_id: int,
    repo: UserQueries = Depends()
):
    return repo.get_user_by_id(user_id)

@router.get('/api/users/username/{username}', response_model=Union[UserOutWithPassword, Error])
def get_user_by_username(
    username: str,
    repo: UserQueries = Depends()
):
    try:
        return repo.get_user_by_username(username)
    except Exception as e:
        print(e)
        return Error(message=str(e))

@router.delete('/api/users/{user_id}', response_model=Union[bool, Error])
def delete_user(
    user_id: int,
    repo: UserQueries = Depends()
):
    return repo.delete_user(user_id)

@router.put('/api/users/{user_id}', response_model=Union[TokenResponse, Error])
async def update_user(
    user_id: int,
    user: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends()
):
    hashed_password = authenticator.hash_password(user.password)
    try:
        result = repo.update_user(user, user_id, hashed_password=hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update account with these credentials"
        )
    form = UserForm(username=user.username, password=user.password)
    token = await authenticator.login(response, request, form, repo)
    return UserToken(user=result, **token.dict())

@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    repo: UserQueries = Depends(authenticator.try_get_current_account_data)
) -> UserToken | None:
    if repo and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": repo,
        }
