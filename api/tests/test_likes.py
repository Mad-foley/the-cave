from fastapi.testclient import TestClient
from main import app
from queries.likes import LikeQueries
from queries.logs import LogQueries
import authenticator
from models.like_models import LikeOut


def fake_account_data():
    return {
            "token": "1",
            "token_type": "Bearer"
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

def test_create_user():
    app.dependency_overrides[LogQueries] = FakeLogQueries
    app.dependency_overrides[LikeQueries] = FakeLikeQueries
    
    input = {
            "wine_id": 1,
            "user_id": 1,
            }

    response = client.post(
        '/api/wines/1/likes',
        json = input
    )

    assert response.status_code == 200, response.text
