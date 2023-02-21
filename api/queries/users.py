from queries.db import pool

from models.user_models import (
    UserOut,
    UserIn,
    Error,
    UserOutWithPassword,
    )

from queries.likes import timestamp
from typing import List


class UserQueries:
    def get_all_users(self) -> List[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, birthday, image_url, modified_on, created_on, id
                        FROM users;
                        """
                    )
                    return [
                        UserOut(
                        name=record[0],
                        username=record[1],
                        birthday=record[2],
                        image_url=record[3],
                        modified_on=record[4],
                        created_on=record[5],
                        id=record[6]
                        )
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return Error(message=str(e))

    def get_user_by_id(self, user_id: int) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, password, birthday, image_url, modified_on, created_on, id
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

    # Query for the authenticator, keep it simple as to not confuse the authenticator
    def get_user_by_username(self, username: str) -> UserOutWithPassword:
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

    def create_user(self, user:UserIn, hashed_password:str) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO users
                            (name, username, password, birthday, image_url, modified_on, created_on)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.name,
                            user.username,
                            hashed_password,
                            user.birthday,
                            user.image_url,
                            timestamp(),
                            timestamp()
                        ]
                    )
                    id = result.fetchone()[0]
                    return UserOutWithPassword(
                            id=id,
                            hashed_password=hashed_password,
                            modified_on=timestamp(),
                            created_on=timestamp(),
                            **user.dict()
                            )
        except Exception as e:
            print(e)
            return Error(message=str(e))

    def delete_user(self, user_id:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s;
                        """,
                        [user_id]
                    )
                    return True if result is not None else False

        except Exception as e:
            print(e)
            return Error(message=str(e))

    def update_user(self, user:UserIn, user_id:int, hashed_password:str) -> UserOutWithPassword:
        # User id is gathered from authenticator so only the logged-in user can update their account
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE users
                        SET name=%s, username=%s, password=%s, birthday=%s, image_url=%s, modified_on=%s
                        WHERE id = %s
                        RETURNING created_on;
                        """,
                        [
                            user.name,
                            user.username,
                            hashed_password,
                            user.birthday,
                            user.image_url,
                            timestamp(),
                            user_id
                        ]
                    )
                    created_on = result.fetchone()[0]
                    return UserOutWithPassword(
                            id=user_id,
                            hashed_password=hashed_password,
                            created_on=created_on,
                            name=user.name,
                            username=user.username,
                            birthday=user.birthday,
                            image_url=user.image_url,
                            modified_on=timestamp()
                            )
        except Exception as e:
            print(e)
            return Error(message=str(e))


    def record_to_user_out(self, record) -> UserOutWithPassword:
        try:
            return UserOutWithPassword(
                name=record[0],
                username=record[1],
                hashed_password=record[2],
                birthday = record[3],
                image_url=record[4],
                modified_on=record[5],
                created_on=record[6],
                id=record[7]
            )
        except Exception as e:
            print(e)
            return Error(message=str(e))
