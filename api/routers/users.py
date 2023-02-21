from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status
)
from models.user_models import (
    UserIn,
    UserOut,
    Error,
    UserToken,
    UserForm,
    UserOutWithPassword,
    DuplicateUserError,
    TokenResponse
)
from queries.users import UserQueries
from queries.logs import LogQueries

from authenticator import authenticator

from typing import List, Union, Optional



router = APIRouter()

@router.get('/api/users', response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        return repo.get_all_users()
    return {"message":"You are not logged in"}
@router.post('/api/users', response_model=Union[TokenResponse, Error])

async def create_user(
    user: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
    log: LogQueries = Depends()
):
    hashed_password = authenticator.hash_password(user.password)
    try:
        result = repo.create_user(user, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials"
        )
    # User the result to populate the message
    message = f"Welcome {result.dict()['name']} to the cave!"
    # Create a new user log
    log.create_log(result.dict()['id'],message)
    # Create a form with the user info
    form = UserForm(username=user.username, password=user.password)
    # Call the authenticator to create a token
    token = await authenticator.login(response, request, form, repo)
    # Return user info with token
    return UserToken(user=result, **token.dict())

@router.get('/api/users/{user_id}', response_model=Union[UserOut, Error])
def get_user_by_id(
    user_id: int,
    repo: UserQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        return repo.get_user_by_id(user_id)
    return {"message":"You are not logged in"}

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
    repo: UserQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        return repo.delete_user(account_data['id'])

@router.put('/api/users/{user_id}', response_model=Union[TokenResponse, Error])
async def update_user(
    user: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    log: LogQueries = Depends()
):
    hashed_password = authenticator.hash_password(user.password)
    try:
        result = repo.update_user(user, account_data['id'], hashed_password=hashed_password)
        message = f"{account_data['name']} updated their account"
        log.create_log(account_data['id'],message)
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
