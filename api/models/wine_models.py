from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class WineIn(BaseModel):
    name: str
    location: Optional[str]
    varietal: Optional[str]
    winery: Optional[str]
    image_url: Optional[str]
    vintage: Optional[str]


class WineOut(WineIn):
    created_on: Optional[datetime | str]
    modified_on: Optional[datetime | str]
    created_by: int
    id: int
