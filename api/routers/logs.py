from fastapi import APIRouter, Depends
from queries.users import Error
from queries.logs import LogQueries, LogOut
from authenticator import authenticator
from typing import List, Optional


router = APIRouter()


@router.get('/api/logs', response_model=List[LogOut] | Error)
def get_all_logs(
    repo: LogQueries = Depends()
):
    return repo.get_all_logs()


@router.get('/api/logs/me', response_model=List[LogOut] | Error)
def get_my_logs(
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: LogQueries = Depends()
):
    return repo.get_my_log(account_data['id'])
