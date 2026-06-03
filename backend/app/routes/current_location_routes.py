# this route is for connecting phone and laptop to get gps current location coordinates
from app.schemas.location_schema import CurrentLocation
from app.services.location_service import get_location, save_location
from fastapi import APIRouter

router = APIRouter()


# request the phone device to get current location coordinates
@router.post("/")
def update_current_location(location: CurrentLocation):
    save_location(location)

    return {"message": "location updated successfully"}


# this is get request to get coordinates from phone gps
@router.get("/")
def get_current_location():
    location = get_location()

    if location is None:
        return {"message": "No location available"}

    return location
