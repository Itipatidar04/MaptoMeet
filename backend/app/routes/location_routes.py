import requests
from fastapi import APIRouter

# creates router object
router = APIRouter()


# created search endpoint
@router.get("/search")
# function which will search location using nomination api
def search_location(q: str):

    # nomination api
    url = "https://nominatim.openstreetmap.org/search"
    # query parameters that we passed for this api
    params = {
        "q": q,
        "format": "jsonv2",
        "limit": 5,
        "viewbox": "75.70,22.85,75.95,22.60",
        "bounded": 1,
    }
    # nomination uses headers(user agents: idetifies who is making the request). used to track user agents and identify clients and limit rate
    headers = {"User-Agent": "MapToMeetApp"}
    # response of the query is saved in this variable
    response = requests.get(url, params=params)
    # that response is converted to json and saved in data
    data = response.json()
    cleaned_results = []
    # this cleans fetched data recursively
    for location in data:
        cleaned_results.append(
            {
                "name": location["display_name"],
                "latitude": location["lat"],
                "longitude": location["lon"],
            }
        )
    return cleaned_results
