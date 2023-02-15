import requests
from pydantic import BaseModel
from queries.users import Error


class SampleWineOut(BaseModel):
    winery: str
    wine: str
    location: str
    image: str
    id: int

class SampleApiWineQueries:
    def get_wines(self, type):
        response = requests.get(f'https://api.sampleapis.com/wines/{type}')
        if response.ok:
            result = response.json()
            return [SampleWineOut(**item) for item in result]
        return Error(message="Cannot get wines from Sample API Wines")
