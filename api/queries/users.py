from models.user_models import (
    UserIn,
    Error,
    UserOutWithPassword,
    )
from queries.db import pool


class UserQueries:
    def get_all_users(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, password, birthday, image_url,  id
                        FROM users;
                        """
                    )
                    return [
                        self.record_to_user_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return Error(message=str(e))

    def get_user_by_id(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, password, birthday, image_url, id
                        FROM users
                        WHERE id = %s;
                        """,
                        [user_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return {"message":"Could not get user"}
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return Error(message=str(e))

    def get_user_by_username(self, username: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, password, id
                        FROM users
                        WHERE username = %s;
                        """,
                        [username]
                    )
                    record = result.fetchone()
                    if record is None:
                        return {"message":"Could not get user"}
                    return UserOutWithPassword(
                        name=record[0],
                        username=record[1],
                        hashed_password=record[2],
                        id=record[3]
                    )

        except Exception as e:
            print(e)
            return Error(message=str(e))

    def create_user(self, user, hashed_password):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO users
                            (name, username, password, birthday, image_url)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.name,
                            user.username,
                            hashed_password,
                            user.birthday,
                            user.image_url
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.user_in_and_out(user, id, hashed_password)
        except Exception as e:
            print(e)
            return Error(message=str(e))

    def delete_user(self, user_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s;
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return Error(message=str(e))

    def update_user(self, user, user_id, hashed_password):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE users
                        SET name=%s, username=%s, password=%s, birthday=%s, image_url=%s
                        WHERE id = %s
                        """,
                        [
                            user.name,
                            user.username,
                            hashed_password,
                            user.birthday,
                            user.image_url,
                            user_id
                        ]
                    )
                    return self.user_in_and_out(user, user_id, hashed_password)
        except Exception as e:
            print(e)
            return Error(message=str(e))

    def user_in_and_out(self, user:UserIn, user_id: int, hashed_password):
        try:
            data = user.dict()
            return UserOutWithPassword(
                id=user_id,
                hashed_password=hashed_password,
                **data
                )
        except Exception as e:
            print(e)
            return Error(message=str(e))

    def record_to_user_out(self, record):
        try:
            return UserOutWithPassword(
                name=record[0],
                username=record[1],
                hashed_password=record[2],
                birthday = record[3],
                image_url=record[4],
                id=record[5]
            )
        except Exception as e:
            print(e)
            return Error(message=str(e))
