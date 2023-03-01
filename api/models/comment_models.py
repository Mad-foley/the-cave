from pydantic import BaseModel
from datetime import datetime


class CommentIn(BaseModel):
    comment: str


class CommentOut(BaseModel):
    user_id: int
    wine_id: int
    created_on: datetime
    modified_on: datetime
    comment: str
    id: int
