from fastapi.testclient import TestClient
from main import app
from queries.likes import LikeQueries
from queries.logs import LogQueries
from models.like_models import LikeOut
from authenticator import authenticator



def fake_account_data():
    return {
        "name": "1",
        "username": "1",
        "password": "1",
        "id": 1
    }

class FakeLikeQueries():
    def create_like(self, wine_id, user_id):
        return LikeOut(
            wine_id = wine_id,
            user_id = user_id,
            created_on = 2000-1-1,
            id = 1
        )


class FakeLogQueries():
    def create_log(self, id, message):
        return {"message": message}


client = TestClient(app)


def test_create_like():
    app.dependency_overrides[LogQueries] = FakeLogQueries
    app.dependency_overrides[LikeQueries] = FakeLikeQueries
    app.dependency_overrides[authenticator.try_get_current_account_data] = fake_account_data

    input = {
            "wine_id": 1,
            "user_id": 1
            }

    response = client.post(
        '/api/wines/1/likes',
        json = input
    )
    data = response.json()
    print(data)
    assert response.status_code == 200, response.text
    data = response.json()
    print(data)
    assert data["wine_id"] == 1
    assert data["user_id"] == 1
