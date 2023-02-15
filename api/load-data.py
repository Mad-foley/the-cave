from pydantic import BaseModel
from datetime import date
from typing import Optional
import json
import datetime
from queries.db import pool
from queries.wines import WineIn
currentDT = datetime.datetime.now()



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
