import requests
from pydantic import BaseModel
from queries.users import Error
from typing import List

class SampleWineOut(BaseModel):
    winery: str
    wine: str
    vintage: str
    location: str
    image: str
    id: int

class SampleApiWineQueries:
    def get_wines(self, type) -> List[SampleWineOut]:
        response = requests.get(f'https://api.sampleapis.com/wines/{type}')
        if response.ok:
            result = response.json()
            return [SampleWineOut(
                winery=item['winery'],
                wine=item['wine'][:len(item['wine']) - 5],
                vintage=item['wine'][len(item['wine']) - 4:],
                location=item['location'],
                image=item['image'],
                id=item['id']
            ) for item in result]
        return Error(message="Cannot get wines from Sample API Wines")
