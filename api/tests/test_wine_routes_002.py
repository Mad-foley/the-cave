from fastapi.testclient import TestClient
from models.wine_models import WineIn, WineOut
from queries.wines import WineQueries
from queries.logs import LogQueries
from authenticator import authenticator
from main import app
from datetime import datetime

##### Written by Malcolm


client = TestClient(app)
def test_get_wines():
    response = client.get('/api/wines')
    data = response.json()

    assert response.status_code == 200
    assert type(data) == type([])
    assert type(data[0]) == type({})
    assert type(data[0]['name']) == type('')
    assert type(data[0]['id']) == type(0)
    assert len(data[0]) == 10

def fake_get_current_account_data():
    return {
        'name':'test',
        'username':'tester',
        'password':'password',
        'id':2
    }
class FakeWineData:
    def update_wine(self, wine_id:int, wine:WineIn):
        return WineOut(
            name=wine.name,
            location=wine.location,
            varietal=wine.varietal,
            winery=wine.winery,
            image_url=wine.image_url,
            created_on=datetime(1992,12,30,4,22,21),
            modified_on='2000-12-30',
            created_by=2,
            id=wine_id
            )

class FakeLogData:
    def create_log(self, user_id, note):
        return {'data':note}

def test_update_wine():
    app.dependency_overrides[authenticator.try_get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[WineQueries] = FakeWineData
    app.dependency_overrides[LogQueries] = FakeLogData
    response = client.put(
        f'/api/wines/2',
        json={
            'name':'tester',
            'location':'somewhere',
            'varietal':'wine',
            'winery':'grape vineyards',
            'image_url':'image.com',
            'vintage':'2003'
            }
        )
    data = response.json()

    assert type(data) == type({})
    assert data['name'] == 'tester'
    assert data['location'] == 'somewhere'
