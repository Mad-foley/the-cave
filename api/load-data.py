from pydantic import BaseModel
from datetime import date
from typing import Optional
import json
import datetime
from queries.db import pool
from queries.wines import WineIn, WineQueries
currentDT = datetime.datetime.now()


repo = WineQueries
with open('data/winebid-data.json') as json_data:
    data = json.load(json_data)
    output = [
        WineIn(
            name = wine["name"],
            location = wine["region"],
            varietal = wine["type"],
            winery = wine["producer"],
            image_url = wine["photo_url"],
            vintage = wine["vintage"][:4],
            created_on = currentDT,
            modified_on = currentDT,
            ) for wine in data ]
    print(output[0])

for wine in output:
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
            print("successfully added wine data")
