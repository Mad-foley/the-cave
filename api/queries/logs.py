from queries.db import pool
from models.log_models import LogOut
from queries.likes import timestamp
from typing import List


# Automatically create a log whenever a user creates, updates or deletes
class LogQueries:
    def get_all_logs(self) -> List[LogOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT user_id, note, created_on, id
                        FROM logs
                        ORDER BY created_on;
                        """
                    )
                    return [LogOut(
                        user_id=record[0],
                        note=record[1],
                        created_on=record[2],
                        id=record[3]
                    ) for record in result]
        except Exception as e:
            print(e)
            return {"message": "Failed to get all logs"}

    def create_log(self, user_id: int, note: str) -> LogOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO logs
                            (user_id, note, created_on)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [user_id, note, timestamp()]
                    )
                    id = result.fetchone()[0]
                    return LogOut(
                        user_id=user_id,
                        note=note,
                        created_on=str(timestamp()),
                        id=id
                    )
        except Exception as e:
            print(e)
            return {"message": "Failed to create log"}

    def get_my_log(self, user_id: int) -> List[LogOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT user_id, note, created_on, id
                        FROM logs
                        WHERE user_id = %s
                        ORDER BY created_on;
                        """,
                        [user_id]
                    )
                    return [LogOut(
                        user_id=record[0],
                        note=record[1],
                        created_on=record[2],
                        id=record[3]
                    ) for record in result]
        except Exception as e:
            print(e)
            return {"messagge": "Failed to get my logs"}
