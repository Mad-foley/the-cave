from queries.db import pool
from datetime import date
from models.comment_models import CommentIn, CommentOut

class CommentQueries:
    def get_all_comments(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT user_id, wine_id, comment, created_on, id
                        FROM comments
                        ORDER BY created_on;
                        """
                    )
                    return [self.record_to_comment_out(record) for record in result]
        except Exception as e:
            print(e)
            return {"message":"Failed to find comments"}

    def get_comment_by_wine(self, wine_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT user_id, wine_id, comment, created_on, id
                        FROM comments
                        WHERE wine_id = %s
                        ORDER BY created_on;
                        """,
                        [wine_id]
                    )
                    return [self.record_to_comment_out(record) for record in result]
        except Exception as e:
            print(e)
            return {"message":"Failed to find comments"}

    def get_comment_by_user(self, user_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT user_id, wine_id, comment, created_on, id
                        FROM comments
                        WHERE user_id = %s
                        ORDER BY created_on;
                        """,
                        [user_id]
                    )
                    return [self.record_to_comment_out(record) for record in result]
        except Exception as e:
            print(e)
            return {"message":"Failed to find comments"}

    def update_comment(self, comment_id, comment: CommentIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE comments
                        SET comment=%s
                        WHERE id = %s
                        RETURNING user_id, wine_id, comment, created_on, id;
                        """,
                        [comment.comment, comment_id]
                    )
                    return self.record_to_comment_out(result.fetchone())
        except Exception as e:
            print(e)
            return {"message":"Failed to update comment"}

    def get_comment_by_id(self, comment_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT user_id, wine_id, comment, created_on, id
                        FROM comments
                        WHERE id = %s;
                        """,
                        [comment_id]
                    )
                    return self.record_to_comment_out(result.fetchone())
        except Exception as e:
            print(e)
            return {"message":"Failed to find comment"}

    def delete_comment(self, comment_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM comments
                        WHERE id = %s
                        RETURNING id;
                        """,
                        [comment_id]
                    )
                    id = result.fetchone()[0]
                    if id:
                        return {"message":"succesfully deleted"}
                    return {"message":"Failed to delete comment"}
        except Exception as e:
            print(e)
            return {"message":"Failed to delete comment"}

    def create_comment(self, wine_id, user_id, comment: CommentIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO  comments (wine_id, user_id, created_on, comment)
                        VALUES (%s, %s, %s, %s)
                        RETURNING user_id, wine_id, comment, created_on, id;
                        """,
                        [wine_id, user_id, comment.created_on, comment.comment]
                    )
                    return self.record_to_comment_out(result.fetchone())
        except Exception as e:
            print(e)
            return {"message":"Failed to create comment"}

    def record_to_comment_out(self, record):
        return CommentOut(
            user_id=record[0],
            wine_id=record[1],
            comment=record[2],
            created_on=record[3],
            id=record[4]
        )
