from psycopg_pool import ConnectionPool
import os
from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional


class UserIn(BaseModel):
    name: str
    username: str
    password: str
    picture_url: Optional[str]
    email: Optional[EmailStr]
    birthday: Optional[date]
    created_on: Optional[date]
    last_login: Optional[date]

class UserOut(UserIn):
    id: int


pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))

class UserQueries:
    def get_all_users(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT name, username, password, picture_url, email, birthday, created_on, last_login, id
                    FROM users;
                    """
                )
                results = []
                for row in cur.fetchall():
                    user = {}
                    for i, column in enumerate(cur.description):
                        user[column.name] = row[i]
                    results.append(user)
                return results


    def get_user_by_id(self, user_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT name, username, password, picture_url, email, birthday, created_on, last_login, id
                    FROM users
                    WHERE id = %s;
                    """,
                    [user_id]
                )
                row = cur.fetchone()
                user = {}
                for i, column in enumerate(cur.description):
                    user[column.name] = row[i]
                return user


    def create_user(self, user):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO users
                        (name, username, password, birthday, picture_url, email, created_on, last_login)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING name, username, password, picture_url, email, birthday, created_on, last_login, id;
                    """,
                    [user.name, user.username, user.password, user.birthday, user.picture_url, user.email, user.created_on, user.last_login]
                )
                row = cur.fetchone()
                output = {}
                for i, column in enumerate(cur.description):
                    output[column.name] = row[i]
                return output

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
        except Exception as error:
            return error

    def update_user(self, user, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE users
                    SET name=%s, username=%s, password=%s, birthday=%s, picture_url=%s, email=%s, created_on=%s, last_login=%s
                    WHERE id = %s
                    """,
                    [user.name, user.username, user.password, user.birthday, user.picture_url, user.email, user.created_on, user.last_login, user_id]
                )
                return self.user_in_and_out(user, user_id)


    def user_in_and_out(self, user: UserIn, user_id: int):
        data = user.dict()
        return UserOut(id=user_id, **data)
