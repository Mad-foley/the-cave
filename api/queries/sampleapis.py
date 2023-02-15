import requests
from pydantic import BaseModel

class SampleWineOut(BaseModel):
    winery: str
    wine: str
    location: str
    image: str
    id: int

class SampleApiWineQueries:
    def get_port_wines(self):
        response = requests.get('https://api.sampleapis.com/wines/port')
        result = response.json()
        return [SampleWineOut(**item) for item in result]
    def get_red_wines(self):
        response = requests.get('https://api.sampleapis.com/wines/reds')
        result = response.json()
        return [SampleWineOut(**item) for item in result]
    def get_white_wines(self):
        response = requests.get('https://api.sampleapis.com/wines/whites')
        result = response.json()
        return [SampleWineOut(**item) for item in result]
    def get_sparkling_wines(self):
        response = requests.get('https://api.sampleapis.com/wines/sparkling')
        result = response.json()
        return [SampleWineOut(**item) for item in result]
    def get_dessert_wines(self):
        response = requests.get('https://api.sampleapis.com/wines/desserts')
        result = response.json()
        return [SampleWineOut(**item) for item in result]
    def get_rose_wines(self):
        response = requests.get('https://api.sampleapis.com/wines/rose')
        result = response.json()
        return [SampleWineOut(**item) for item in result]
