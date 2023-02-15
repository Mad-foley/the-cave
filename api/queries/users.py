from pydantic import BaseModel, EmailStr
from datetime import datetime, date
from typing import Optional
from queries.db import pool
from jwtdown_fastapi.authentication import Token
from fastapi.encoders import jsonable_encoder

class Error(BaseModel):
    message: str

class UserIn(BaseModel):
    name: str
    username: str
    password: str
    birthday: Optional[datetime] = None
    image_url: Optional[str] = None


class UserOut(BaseModel):
    id: int
    name: str
    username: str
    birthday: Optional[str]
    image_url: Optional[str]

class UserOutWithPassword(BaseModel):
    id: int
    name: str
    username: str
    birthday: Optional[str | datetime | date]
    image_url: Optional[str]
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

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserOutWithPassword

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
                        self.record_to_user_out(jsonable_encoder(record))
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
                        SELECT name, username, password, birthday, id
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
                    return UserOutWithPassword(
                        name=record[0],
                        username=record[1],
                        hashed_password=record[2],
                        id=record[3]
                    )

        except Exception as e:
            print(e)
            return {"message": "Could not get user"}
    def create_user(self, user, hashed_password):
        print("**************************************************** user in")
        print(user)
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
                            jsonable_encoder(user.birthday),
                            user.image_url
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
            return {"message": "Could not update users"}

    def user_in_and_out(self, user:UserIn, user_id: int, hashed_password):
        print("******************************* user in and out data")
        data = user.dict()
        print(data)
        return UserOutWithPassword(
            id=user_id,
            hashed_password=hashed_password,
            **data
            )


    def record_to_user_out(self, record):
        print("****************************** record out")
        print(record)
        return UserOutWithPassword(
            name=record[0],
            username=record[1],
            hashed_password=record[2],
            birthday = record[3],
            image_url=record[4],
            id=record[5]
        )
