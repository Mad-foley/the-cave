
from queries.wines import WineQueries
import datetime
import json

currentDT = datetime.datetime.now()

with open('data/winebid-data.json') as json_data:
    data = json.load(json_data)
    output = []
    for wine in data:
        new_data = {
            "name": wine["name"],
            "location": wine["region"],
            "varietal": wine["type"],
            "winery":wine["producer"],
            "image_url":wine["photo_url"],
            "vintage":wine["vintage"][:4],
            "created_on": currentDT,
            "modifed_on": currentDT,
        }
        output.append(new_data)
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             cur.execute(
    #                 """
    #                 INSERT INTO wines
    #                     (name, location, varietal, winery, image_url, vintage, created_on, modified_on)
    #                 VALUES
    #                     (%s, %s, %s, %s, %s, %s, %s, %s);
    #                 """,
    #                 [
    #                     wine.name,
    #                     wine.location,
    #                     wine.varietal,
    #                     wine.winery,
    #                     wine.image_url,
    #                     wine.vintage,
    #                     wine.created_on,
    #                     wine.modified_on
    #                 ]
    #             )
    #             print(wine.name + " loaded")
