from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional
from queries.db import pool

class Error(BaseModel):
    message: str

class UserIn(BaseModel):
    name: str
    username: str
    picture_url: Optional[str]
    email: Optional[EmailStr]
    birthday: Optional[date]
    created_on: Optional[date]
    last_login: Optional[date]


class UserOut(UserIn):
    id: int

class UserOutWithPass(UserOut):
    hashed_password: str


class UserQueries:
    def get_all_users(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, password, picture_url, email, birthday, created_on, last_login, id
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
                        SELECT name, username, password, picture_url, email, birthday, created_on, last_login, id
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

    def create_user(self, user: UserIn, hash_password) -> UserOutWithPass:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO users
                            (name, username, hash_password, birthday, picture_url, email, created_on, last_login)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.name,
                            user.username,
                            hash_password,
                            user.birthday,
                            user.picture_url,
                            user.email,
                            user.created_on,
                            user.last_login,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.user_in_and_out(user, id)
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

    def update_user(self, user, user_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE users
                        SET name=%s, username=%s, password=%s, birthday=%s, picture_url=%s, email=%s, created_on=%s, last_login=%s
                        WHERE id = %s
                        """,
                        [
                            user.name,
                            user.username,
                            user.password,
                            user.birthday,
                            user.picture_url,
                            user.email,
                            user.created_on,
                            user.last_login,
                            user_id
                        ]
                    )
                    return self.user_in_and_out(user, user_id)
        except Exception as e:
            print(e)
            return {"message": "Could not update users"}

    def user_in_and_out(self, user: UserIn, user_id: int):
        data = user.dict()
        return UserOutWithPass(id=user_id, **data)


    def record_to_user_out(self, record):
        return UserOut(
            name=record[0],
            username=record[1],
            password=record[2],
            picture_url=record[3],
            email=record[4],
            birthday=record[5],
            created_on=record[6],
            last_login=record[7],
            id=record[8]
        )
