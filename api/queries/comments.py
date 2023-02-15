from pydantic import BaseModel
from queries.db import pool
from datetime import date

class CommentIn(BaseModel):
    user_id: int
    wine_id: int
    created_on: date
    comment: str

class CommentOut(CommentIn):
    id: int

class CommentQueries:
    def get_comment_by_wine(self, wine_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT user_id, wine_id, comment, created_on, id
                        FROM comments;
                        """
                    )
                    return [self.record_to_comment_out(record) for record in result]
        except Exception as e:
            print(e)
            return {"message":"Failed to find comments"}

    def record_to_comment_out(self, record):
        return CommentOut(
            user_id=record[0],
            wine_id=record[1],
            comment=record[2],
            created_on=record[3],
            id=record[4]
        )
