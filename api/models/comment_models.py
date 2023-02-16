from pydantic import BaseModel
from datetime import date

class CommentIn(BaseModel):
    created_on: date
    comment: str

class CommentOut(BaseModel):
    user_id: int
    wine_id: int
    created_on: date
    comment: str
    id: int
