from fastapi import APIRouter, Depends
from models.comment_models import CommentIn, CommentOut
from queries.users import Error
from queries.comments import CommentQueries
from queries.logs import LogQueries
from queries.wines import WineQueries
from authenticator import authenticator
from typing import List, Union, Optional

router = APIRouter()


@router.get('/api/comments', response_model=Union[List[CommentOut], Error])
def get_all_comments(
    repo: CommentQueries = Depends(),
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data)
):
    if account_data:
        return repo.get_all_comments()
    else:
        return Error(message="You aren't logged in")


@router.get('/api/wines/{wine_id}/comments',
            response_model=Union[List[CommentOut], Error])
def get_comment_by_wine(
    wine_id: int,
    repo: CommentQueries = Depends(),
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data)
):
    if account_data:
        return repo.get_comment_by_wine(wine_id)
    else:
        return Error(message="You aren't logged in")


@router.get('/api/users/{user_id}/comments',
            response_model=Union[List[CommentOut], Error])
def get_comment_by_user(
    user_id: int,
    repo: CommentQueries = Depends(),
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data)
):
    if account_data:
        return repo.get_comment_by_user(user_id)
    else:
        return Error(message="You aren't logged in")


@router.post('/api/wines/{wine_id}/comments',
             response_model=Union[CommentOut, Error])
def create_comment(
    comment: CommentIn,
    wine_id: int,
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends(),
    wine_repo: WineQueries = Depends(),
    log: LogQueries = Depends()
):
    if account_data:
        user_id = account_data["id"]
        result = repo.create_comment(wine_id, user_id, comment)
        # Get wine details
        wine = wine_repo.get_wine_by_id(wine_id)
        # Use wine detail to populate message
        message = f"{account_data['name']} commented on{wine.name}"
        # Create a new log
        log.create_log(account_data['id'], message)
        # Return comment result
        return result
    else:
        return Error(message="You aren't logged in")


@router.put('/api/wines/comments/{comment_id}',
            response_model=Union[CommentOut, Error])
def update_comment(
    comment: CommentIn,
    comment_id: int,
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends(),
    wine_repo: WineQueries = Depends(),
    log: LogQueries = Depends()
):
    if account_data:
        result = repo.update_comment(comment_id, comment)
        # Get wine detail from comment result by matching comment wine id
        wine = wine_repo.get_wine_by_id(result.dict()['wine_id'])
        # Use wine to populate message
        message = f"{account_data['name']} updated their comment on {wine.name}"
        # Create log
        log.create_log(account_data['id'], message)
        # Return comment
        return result
    else:
        return Error(message="You aren't logged in")


@router.get('/api/comments/{comment_id}',
            response_model=Union[CommentOut, Error])
def get_comment_by_id(
    comment_id: int,
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends()
):
    if account_data:
        return repo.get_comment_by_id(comment_id)
    else:
        return Error(message="You aren't logged in")


@router.delete('/api/wines/comments/{comment_id}')
def delete_comment(
    comment_id: int,
    account_data: Optional[dict]
    = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends(),
    wine_repo: WineQueries = Depends(),
    log: LogQueries = Depends()
):
    if account_data:
        result = repo.delete_comment(comment_id)
        # Get wine detail by matching the result which is the wine id
        wine = wine_repo.get_wine_by_id(result)
        # Use wine to populate message
        message = f"{account_data['name']} deleted their comment on{wine.name}"
        # Create log
        log.create_log(account_data['id'], message)
        return {"message": "Successfully deleted comment"}
    else:
        return Error(message="Your aren't logged in")
