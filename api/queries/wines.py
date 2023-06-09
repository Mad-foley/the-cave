from queries.db import pool
from models.wine_models import WineIn, WineOut
from typing import List
from queries.likes import timestamp


class WineQueries:
    def get_all_wines(self) -> List[WineOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, location, varietal, winery
                             , image_url, vintage, created_on
                             , modified_on, created_by, id
                        FROM wines
                        ORDER BY id;
                        """
                    )
                    return [self.record_to_wine_out(record)
                            for record in result]
        except Exception as e:
            print(e)
            return {"message": "Failed to find wines"}

    def create_wine(self, wine: WineIn, user_id: int) -> WineOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO wines
                            (name, location, varietal, winery
                                 , image_url, vintage, created_on
                                 , modified_on, created_by)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            wine.name,
                            wine.location,
                            wine.varietal,
                            wine.winery,
                            wine.image_url,
                            wine.vintage,
                            timestamp(),
                            timestamp(),
                            user_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return WineOut(
                        id=id,
                        created_by=user_id,
                        name=wine.name,
                        location=wine.location,
                        varietal=wine.varietal,
                        winery=wine.winery,
                        image_url=wine.image_url,
                        vintage=wine.vintage,
                        modified_on=str(timestamp()),
                        created_on=str(timestamp())
                        )
        except Exception as e:
            print(e)
            return {"message": "Failed to create wine"}

    def update_wine(self, wine_id: int, wine: WineIn) -> WineOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE wines
                        SET name=%s, location=%s, varietal=%s
                          , winery=%s, image_url=%s, vintage=%s
                          , modified_on=%s
                        WHERE id=%s
                        RETURNING
                        name,
                        location,
                        varietal,
                        winery,
                        image_url,
                        vintage,
                        modified_on,
                        created_on,
                        created_by,
                        id;
                        """,
                        [
                            wine.name,
                            wine.location,
                            wine.varietal,
                            wine.winery,
                            wine.image_url,
                            wine.vintage,
                            timestamp(),
                            wine_id
                        ]
                    )
                    record = result.fetchone()
                    return self.record_to_wine_out(record)
        except Exception as e:
            print(e)
            return {"message": "Failed to update wine"}

    def get_wine_by_id(self, wine_id: int) -> WineOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, location, varietal, winery
                             , image_url, vintage, created_on
                             , modified_on, created_by, id
                        FROM wines
                        WHERE id=%s;
                        """,
                        [wine_id]
                    )
                    record = result.fetchone()
                    return self.record_to_wine_out(record)
        except Exception as e:
            print(e)
            return {"message": "Failed to get wine by id"}

    def delete_wine(self, wine_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM wines
                        WHERE id=%s
                        RETURNING name;
                        """,
                        [wine_id]
                    )
                    name = result.fetchone()[0]
                    if name:
                        return name
                    return {"message": "Failed to delete wine"}
        except Exception as e:
            print(e)
            return {"message": "Failed to delete wine"}

    def get_wine_by_user(self, user_id: int) -> List[WineOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, location, varietal, winery
                             , image_url, vintage, created_on
                             , modified_on, created_by, id
                        FROM wines
                        WHERE created_by = %s;
                        """,
                        [user_id]
                    )
                    return [self.record_to_wine_out(record)
                            for record in result]
        except Exception as e:
            print(e)
            return {"message": "Failed to get wines by user"}

    def filter_by(self, query: str) -> List[WineOut]:
        # To use LIKE in SQL you need to concatenate your query
        # with % symbols before and after
        input = '%' + query + '%'
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, location, varietal, winery
                             , image_url, vintage, created_on
                             , modified_on, created_by, id
                        FROM wines
                        WHERE name LIKE %s
                        OR location LIKE %s
                        OR varietal LIKE %s
                        OR winery LIKE %s
                        OR vintage LIKE %s
                        ;
                        """,
                        [input, input, input, input, input]
                    )
                    return [self.record_to_wine_out(record)
                            for record in result]
        except Exception as e:
            print(e)
            return {"message": "Failed to get wines by filter"}

    def record_to_wine_out(self, record) -> WineOut:
        return WineOut(
            name=record[0],
            location=record[1],
            varietal=record[2],
            winery=record[3],
            image_url=record[4],
            vintage=record[5],
            created_on=record[6],
            modified_on=record[7],
            created_by=record[8],
            id=record[9]
        )
