from fastapi.testclient import TestClient
from main import app
from queries.likes import LikeQueries

client = TestClient(app)

class FakeLikeQueries:
    def get_all_likes(self):
       return [
  {
    "wine_id": 6,
    "user_id": 1,
    "created_on": "2022-02-28",
    "id": 3
  }
]


def test_get_all_likes():
    app.dependency_overrides[LikeQueries] = FakeLikeQueries


    res = client.get('/api/likes')
    data = res.json()


    assert res.status_code == 200
    assert isinstance(data,list)
 