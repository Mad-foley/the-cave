import requests
from pydantic import BaseModel

from queries.users import Error

from typing import List


class SampleWineOut(BaseModel):
    type:str
    winery: str
    name: str
    vintage: str
    location: str
    region:str
    image: str
    id: int

def format_type(type):
    if type == 'reds':
        return 'Red Wine'
    elif type == 'whites':
        return 'White Wine'
    elif type == 'sparking':
        return 'Sparkling'
    elif type == 'dessert':
        return 'Dessert'
    elif type == 'port':
        return 'Port'

def format_local(location):
    if location:
        local = location.replace("\n", "")
        return local.split('·')
    return [location, location]

class SampleApiWineQueries:
    def get_wines(self, type:str) -> List[SampleWineOut]:
        response = requests.get(f'https://api.sampleapis.com/wines/{type}')
        if response.ok:
            result = response.json()
            return [SampleWineOut(
                type=format_type(type),
                winery=item['winery'],
                name=item['wine'][:len(item['wine']) - 5],
                vintage=item['wine'][len(item['wine']) - 4:],
                location=format_local(item['location'])[0],
                region=format_local(item['location'])[1],
                image=item['image'],
                id=item['id']
            ) for item in result]
        return Error(message="Cannot get wines from Sample API Wines")

    def get_wine_by_id(self, type:str, id:int) -> SampleWineOut:
        response = requests.get(f'https://api.sampleapis.com/wines/{type}')
        if response.ok:
            result = response.json()
            for item in result:
                if item['id'] == id:
                    return SampleWineOut(
                        type=format_type(type),
                        winery=item['winery'],
                        name=item['wine'][:len(item['wine']) - 5],
                        vintage=item['wine'][len(item['wine']) - 4:],
                        location=format_local(item['location'])[0],
                        region=format_local(item['location'])[1],
                        image=item['image'],
                        id=item['id']
                    )
            return Error(message="Cannot get wine from Sample API Wines")
