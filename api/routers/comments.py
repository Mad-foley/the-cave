from fastapi import APIRouter, Depends
from queries.users import Error
from typing import List, Union, Optional
from authenticator import authenticator
from queries.comments import CommentQueries
router = APIRouter()


@router.get('api/wines/{wine_id}/comments')
def get_comment_by_wine(
    wine_id:int,
    repo: CommentQueries = Depends()
):
    return repo.get_comment_by_wine(wine_id)
