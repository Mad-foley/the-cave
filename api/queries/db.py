from psycopg_pool import ConnectionPool
import os
from pydantic import BaseModel
<<<<<<< HEAD
=======

class UserIn(BaseModel):
    name: str
    username: str
    password: str
    picture_url: str
    email: str
    birthday: str

class UserOut(UserIn):
    id: int

>>>>>>> df8903ca2562b96b1378954816166b86474f3000

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
<<<<<<< HEAD
                    SELECT id, name, username, password, picture_url
=======
                    SELECT name, username, password, picture_url, email, birthday, id
>>>>>>> df8903ca2562b96b1378954816166b86474f3000
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
                    SELECT name, username, password, picture_url, email, birthday, id
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
                result = cur.execute(
                    """
                    INSERT INTO users
                        (name, username, password, birthday, picture_url, email)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING name, username, password, picture_url, email, birthday, id;
                    """,
                    [user.name, user.username, user.password, user.birthday, user.picture_url, user.email]
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
                    SET name=%s, username=%s, password=%s, birthday=%s, picture_url=%s, email=%s
                    WHERE id = %s
                    RETURNING name, username, password;
                    """,
                    [user.name, user.username, user.password, user.birthday, user.picture_url, user.email, user_id]
                )
                return self.user_in_and_out(user, user_id=user_id)


    def user_in_and_out(self, user: UserIn, user_id: int):
        data = user.dict()
        return UserOut(id=user_id, **data)
