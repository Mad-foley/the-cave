import requests
from pydantic import BaseModel
from queries.users import Error
from keys import FOOD_API_KEY


class WinePairingOut(BaseModel):
    name: str
    description: str

class WinePairingQueries:
    def get_wine_pairing(self, food):
        response = requests.get(f"https://zylalabs.com/api/1201/the+ultimate+wine+api/1047/get+wine?q={food}", headers={'Authorization': 'Bearer ' + FOOD_API_KEY } )
        if response.ok:
            result = response.json()
            print("********************************")
            print(result)
            # return result
            tag = [prop for prop in result]
            print(tag)
            if len(tag) > 1:
                return [WinePairingOut(name=wine['name'], description=wine['description']) for wine in result.values()]
            elif tag:
                return [WinePairingOut(name=wine['name'], description=wine['description']) for wine in result[tag[0]]]
            return [WinePairingOut(name=wine['name'], description=wine['description']) for wine in result]

        return Error(message="Cannot get wines from Ultimate Wine Api")
