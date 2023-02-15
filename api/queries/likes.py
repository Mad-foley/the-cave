from pydantic import BaseModel
from queries.db import pool
from datetime import date

class LikeIn(BaseModel):
    wine_id: int
    user_id: int
    created_on: date | None

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
                    print("*********************************** result from database execute")
                    print(result)
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

    def create_like(self, wine_id, user_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO likes (wine_id, user_id)
                        VALUES (%s, %s);
                        """,
                        [wine_id, user_id]
                    )
            return "sucess"

        except Exception as e:
            print(e)
            return {"message":"Failed to like"}

    def delete_like(self,wine_id, user_id):
            try:
                with pool.connection() as conn:
                    with conn.cursor() as cur:
                        result = cur.execute(
                            """
                            DELETE FROM likes
                            WHERE user_id = %s AND wine_id = %s;
                            """,
                            [user_id, wine_id]
                        )
                        return True
            except Exception as e:
                print(e)
                return {"message": "Failed to delete like"}

    def record_to_like_out(self, record):
        return LikeOut(
            wine_id=record[0],
            user_id=record[1],
            created_on=record[2],
            id=record[3]
        )
