from pydantic import BaseModel
from datetime import date


class LikeIn(BaseModel):
    wine_id: int
    user_id: int
    created_on: date | None


class LikeOut(LikeIn):
    id: int
