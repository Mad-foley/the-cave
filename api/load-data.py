import json
import datetime
from queries.db import pool

currentDT = datetime.datetime.now()

# Create default user to insert new wine data
with pool.connection() as conn:
    with conn.cursor() as cur:
        result = cur.execute(
            """
            INSERT INTO users
                (name, username, password)
            VALUES
                ('user01', 'username01', 'password01')
            RETURNING id;
            """
        )
        id = result.fetchone()[0]

with open('data/winebid-data.json') as json_data:
    # Get json data
    data = json.load(json_data)
    # Create a list of new objects formatted to fit into database
    formatted_data = [
            {
            'name':wine["name"][4:],
            'location': wine["region"],
            'varietal': wine["type"],
            'winery':wine["producer"],
            'image_url': wine["photo_url"],
            'vintage':wine["vintage"][:4],
            'created_by': id
            } for wine in data ]

for wine in formatted_data:
    # For each wine in the list of wines connect to the database
    with pool.connection() as conn:
        with conn.cursor() as cur:
            result = cur.execute(
                """
                INSERT INTO wines
                    (name, location, varietal, winery, image_url, vintage, created_on, modified_on, created_by)
                VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
                """,
                [
                    wine['name'],
                    wine['location'],
                    wine['varietal'],
                    wine['winery'],
                    wine['image_url'],
                    wine['vintage'],
                    currentDT,
                    currentDT,
                    wine['created_by']
                ]
            )
            id = result.fetchone()[0]
            # Print a message for each insert for visual feedback
            print("[load-data-log: successfully added wine data] wine ID = ", id)
