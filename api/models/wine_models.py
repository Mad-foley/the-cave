from pydantic import BaseModel
from datetime import date
from typing import Optional

class WineIn(BaseModel):
    name: str
    location: Optional[str]
    varietal: Optional[str]
    winery: Optional[str]
    image_url: Optional[str]
    vintage: Optional[str]
    created_on: Optional[date]
    modified_on: Optional[date]

class WineOut(WineIn):
    created_by: int
    id: int
