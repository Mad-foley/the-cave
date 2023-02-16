from fastapi import APIRouter, Depends
from queries.users import Error
from typing import List, Union, Optional
from authenticator import authenticator
from queries.comments import CommentQueries, CommentIn, CommentOut
from datetime import date
router = APIRouter()

@router.get('/api/comments', response_model=Union[List[CommentOut], Error])
def get_all_comments(
    repo: CommentQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    return repo.get_all_comments()

@router.get('/api/wines/{wine_id}/comments', response_model=Union[List[CommentOut], Error])
def get_comment_by_wine(
    wine_id:int,
    repo: CommentQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    return repo.get_comment_by_wine(wine_id)

@router.get('/api/users/{user_id}/comments', response_model=Union[List[CommentOut], Error])
def get_comment_by_user(
    user_id:int,
    repo: CommentQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    return repo.get_comment_by_user(user_id)

@router.post('/api/wines/{wine_id}/comments', response_model=Union[CommentOut, Error])
def create_comment(
    comment: CommentIn,
    wine_id: int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends()
):
    user_id = account_data["id"]
    return repo.create_comment(wine_id, user_id, comment)

@router.put('/api/wines/comments/{comment_id}', response_model=Union[CommentOut, Error])
def update_comment(
    comment: CommentIn,
    comment_id: int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends()
):
    return repo.update_comment(comment_id, comment)

@router.get('/api/comments/{comment_id}', response_model=Union[CommentOut, Error])
def get_comment_by_id(
    comment_id: int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends()
):
    return repo.get_comment_by_id(comment_id)

@router.delete('/api/wines/comments/{comment_id}')
def delete_comment(
    comment_id: int,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: CommentQueries = Depends()
):
    return repo.delete_comment(comment_id)
