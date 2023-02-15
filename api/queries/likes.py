from pydantic import BaseModel
from queries.db import pool
from datetime import date

class LikeIn(BaseModel):
    wine_id: int
    user_id: int
    created_on: date

class LikeOut(LikeIn):
    id: int

class LikeQueries:
    def get_likes_by_wine(self, wine_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT wine_id, user_id, created_on, id
                        FROM likes
                        WHERE wine_id = %s;
                        """,
                        [wine_id]
                    )
                    return [self.record_to_like_out(record) for record in result]
        except Exception as e:
            print(e)
            return {"message":"Failed to find likes"}

    def get_likes_by_user(self, user_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT wine_id, user_id, created_on, id
                        FROM likes
                        WHERE user_id = %s;
                        """,
                        [user_id]
                    )
                    return [self.record_to_like_out(record) for record in result]
        except Exception as e:
            print(e)
            return {"message":"Failed to find likes"}


    def record_to_like_out(self, record):
        return LikeOut(
            wine_id=record[0],
            user_id=record[1],
            created_on=record[2],
            id=record[3]
        )
