from typing import Literal

import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()


# Pydantic Models


class Coordinate(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)


class RouteRequest(BaseModel):
    source: Coordinate
    destination: Coordinate
    profile: Literal["driving", "walking", "cycling"]


# -----------------------------
# Search Location Endpoint
# -----------------------------


@router.get("/search")
def search_location(q: str):
    url = "https://nominatim.openstreetmap.org/search"

    params = {
        "q": q,
        "format": "jsonv2",
        "limit": 5,
        "viewbox": "75.70,22.85,75.95,22.60",
        "bounded": 1,
    }

    headers = {"User-Agent": "MapToMeetApp"}

    try:
        response = requests.get(
            url,
            params=params,
            headers=headers,
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        cleaned_results = []

        for location in data:
            cleaned_results.append(
                {
                    "name": location["display_name"],
                    "latitude": float(location["lat"]),
                    "longitude": float(location["lon"]),
                }
            )

        return cleaned_results

    except requests.RequestException as e:
        raise HTTPException(
            status_code=500, detail=f"Nominatim request failed: {str(e)}"
        )


# -----------------------------
# Generate Route Endpoint
# -----------------------------


@router.post("/route")
def get_route(request: RouteRequest):

    source_lat = request.source.latitude
    source_lon = request.source.longitude

    destination_lat = request.destination.latitude
    destination_lon = request.destination.longitude

    # OSRM expects longitude,latitude
    coordinates = f"{source_lon},{source_lat};{destination_lon},{destination_lat}"

    url = f"https://router.project-osrm.org/route/v1/{request.profile}/{coordinates}"

    params = {
        "overview": "full",
        "geometries": "geojson",
    }

    headers = {"User-Agent": "MapToMeetApp"}

    try:
        response = requests.get(
            url,
            params=params,
            headers=headers,
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        # Optional debug log
        print(data)

        return data

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"OSRM request failed: {str(e)}")
