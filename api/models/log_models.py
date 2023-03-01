from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class LogIn(BaseModel):
    note: str


class LogOut(LogIn):
    user_id: int
    id: int
    created_on: Optional[datetime | str]
