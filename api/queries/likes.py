from queries.db import pool

from models.like_models import LikeOut

from datetime import datetime, timezone
from typing import List

def timestamp():
    # Get current date and time to input into the created or modified on fields automatically
    return datetime.now(timezone.utc).isoformat()


class LikeQueries:
    def get_likes_by_wine(self, wine_id:int) -> List[LikeOut]:
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

    def get_likes_by_user(self, user_id:int) -> List[LikeOut]:
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

    def create_like(self, wine_id:int, user_id:int) -> LikeOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO likes (wine_id, user_id, created_on)
                        VALUES (%s, %s, %s)
                        RETURNING wine_id, user_id, created_on, id;
                        """,
                        [wine_id, user_id, timestamp()]
                    )
                    record = result.fetchone()
                    return self.record_to_like_out(record)
        except Exception as e:
            print(e)
            return {"message":"Failed to like"}

    def delete_like(self, wine_id:int, user_id:int) -> bool:
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
                        if result is not None:
                            return True
                        return False
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
