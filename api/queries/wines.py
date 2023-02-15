from pydantic import BaseModel
from datetime import date
from typing import Optional
from queries.db import pool

class WineIn(BaseModel):
    name: str
    location: Optional[str]
    varietal: Optional[str]
    winery: Optional[str]
    image_url: Optional[str]
    vintage: Optional[str]
    created_on: Optional[date]
    modified_on: Optional[date]

class WineOut(WineIn):
    id: int


class WineQueries:
    def get_all_wines(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, location, varietal, winery, image_url, vintage, created_on, modified_on, id
                        FROM wines;
                        """
                    )
                    return [self.record_to_wine_out(record) for record in result]
        except Exception as e:
            print(e)
            return {"message":"Failed to find wines"}
    def create_wine(self, wine):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO wines
                            (name, location, varietal, winery, image_url, vintage, created_on, modified_on)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            wine.name,
                            wine.location,
                            wine.varietal,
                            wine.winery,
                            wine.image_url,
                            wine.vintage,
                            wine.created_on,
                            wine.modified_on
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.wine_in_and_out(wine, id)
        except Exception as e:
            print(e)
            return {"message":"Failed to create wine"}

    def record_to_wine_out(self, record):
        return WineOut(
            name=record[0],
            location=record[1],
            varietal=record[2],
            winery=record[3],
            image_url=record[4],
            vintage=record[5],
            created_on=record[6],
            modified_on=record[7],
            id=record[8]
        )
    def wine_in_and_out(self, record: WineIn, wine_id: int):
        data = record.dict()
        return WineOut(id=wine_id, **data)
