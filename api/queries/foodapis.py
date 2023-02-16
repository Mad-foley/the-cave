import requests
from pydantic import BaseModel
from queries.users import Error
import os
FOOD_API_KEY = os.environ.get('FOOD_API_KEY')


class WinePairingOut(BaseModel):
    name: str
    description: str

class WinePairingQueries:
    def get_wine_pairing(self, food):
        url = f"https://zylalabs.com/api/1201/the+ultimate+wine+api/1047/get+wine?q={food}"
        fetchConfigs = {'Authorization': 'Bearer ' + FOOD_API_KEY }
        response = requests.get(url, headers=fetchConfigs)
        if response.ok:
            result = response.json()
            print("********************************** ultimate wine api results")
            print(result)
            # result from this api returns different looking json objects
            # ex: {wines: [{name:name, desc:description}, {name:name, desc:description} ...}]
            # ex: {pairings: [{name, desription}, {name, description} ...}]
            # ex: {wine1: {name, description}, wine2:{name, description}, wine3:...}
            # ex: {{name:name, desc:description}, {name:name, desc:description} ...}
            tag = [prop for prop in result]
            # save the individual properties in result into tag, usually only 1
            # but one output does give us multiple properties and each wine is saved within so...
            if len(tag) > 1:
                try:
                    return [WinePairingOut(name=wine['name'], description=wine['description']) for wine in result.values()]
                except AttributeError as e:
                    print(e)
                    return [WinePairingOut(name=wine['name'], description=wine['description']) for wine in result]
            # sometimes, it has no properties so you just give back the wine data for wine in results
            elif len(tag) < 1:
                return [WinePairingOut(name=wine['name'], description=wine['description']) for wine in result]
            # most case, it only has one tag so create a list of wine pairing outs from data within result[tag[0]] being tag is a list
            return [WinePairingOut(name=wine['name'], description=wine['description']) for wine in result[tag[0]]]
        return Error(message="Cannot get wines from Ultimate Wine Api")
