from fastapi.testclient import TestClient
from main import app
from routers.wines import create_wine
from queries.wines import WineQueries
from authenticator import authenticator
from queries.logs import LogQueries
import json
from models.wine_models import WineOut


client = TestClient(app)

def fake_get_account_data():
    return {
        'id': 99,
        'username': 'fakeuser',
        'password': '123',
        'name': 'maddy',
    }
class FakeLogQueries:
    def create_log(self, account_id, message):
        print(message)
        return {}

class FalseWineQueries:
    def create_wine(self, wine_in, account_id):
        return WineOut(
            name=wine_in.name,
            location=wine_in.location,
            varietal=wine_in.varietal,
            winery=wine_in.winery,
            image_url=wine_in.image_url,
            vintage=wine_in.vintage,
            created_on='today',
            modified_on='tomorrow',
            created_by= account_id,
            id=1
        )

def test_create_wine():

    app.dependency_overrides[authenticator.try_get_current_account_data] = fake_get_account_data
    app.dependency_overrides[WineQueries] = FalseWineQueries
    app.dependency_overrides[LogQueries] = FakeLogQueries


    wine = {
        "name": "Hello",
        "location": "pennsylvania",
        "varietal": "red",
        "winery": "Lahaska",
        "image_url": "google.com",
        "vintage": "2019",
    }
    response = client.post("/api/wines", json=wine)
    data = response.json()

    assert response.status_code == 200
    assert data['name'] == "Hello"
    assert data['location'] == 'pennsylvania'
    assert data['varietal'] == 'red'
    assert data['winery'] == 'Lahaska'
    assert data['image_url'] == 'google.com'
    assert data['vintage'] == '2019'
    assert data['created_on']=='today'
    assert data['modified_on'] == 'tomorrow'
    assert data['created_by'] == 99
    assert data['id'] == 1
