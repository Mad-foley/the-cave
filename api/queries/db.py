from psycopg_pool import ConnectionPool
import os
from pydantic import BaseModel


pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))

class UserIn(BaseModel):
    name: str
    username: str
    password: str
    birthday: str
    email: str
    picture_url: str

class UserOut(UserIn):
    id: int

class UserQueries:
    def get_all_users(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, name, username, password, picture_url
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
                    SELECT id, name, username, password, picture_url
                    FROM users
                    WHERE id = %s;
                    """
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
                result = cur.execute(
                    """
                    INSERT INTO users
                        (name, username, password, birthday, picture_url, email)
                    VALUES
                        (%s, %s, %s, %s, %s);
                    RETURNING id;
                    """,
                    [user.name, user.username, user.password, user.birthday, user.picture_url, user.email]
                )
                id = result.fetchone()[0]
                old_data = result.dict()
                return UserOut(id=id, **old_data)