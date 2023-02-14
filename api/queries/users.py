from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional
from queries.db import pool
from jwtdown_fastapi.authentication import Token


class Error(BaseModel):
    message: str

class UserIn(BaseModel):
    name: str
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    username: str

class UserOutWithPassword(UserOut):
    hashed_password: str

class UserForm(BaseModel):
    username: str
    password: str

class UserToken(Token):
    user: UserOutWithPassword

class HttpError(BaseModel):
    detail: str

class DuplicateUserError(ValueError):
    pass

class UserQueries:
    def get_all_users(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, password, id
                        FROM users;
                        """
                    )
                    return [
                        self.record_to_user_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def get_user_by_id(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, password, id
                        FROM users
                        WHERE id = %s;
                        """,
                        [user_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get user"}

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
                        return None
                    return self.record_to_user_out(record)

        except Exception as e:
            print(e)
            return {"message": "Could not get user"}
    def create_user(self, user, hashed_password):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO users
                            (name, username, password)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.name,
                            user.username,
                            hashed_password
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.user_in_and_out(user, id, hashed_password)
        except Exception as e:
            print(e)
            return {"message": "Could not create user"}

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
            return {"message": "Could not delete user"}

    def update_user(self, user, user_id, hashed_password):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE users
                        SET name=%s, username=%s, password=%s
                        WHERE id = %s
                        """,
                        [
                            user.name,
                            user.password,
                            hashed_password,
                            user_id
                        ]
                    )
                    return self.user_in_and_out(user, user_id)
        except Exception as e:
            print(e)
            return {"message": "Could not update users"}

    def user_in_and_out(self, user: UserIn, user_id: int, hashed_password):
        data = user.dict()
        return UserOutWithPassword(
            id=user_id,
            hashed_password=hashed_password,
            **data
            )


    def record_to_user_out(self, record):
        return UserOutWithPassword(
            name=record[0],
            username=record[1],
            hashed_password=record[2],
            id=record[3]
        )
