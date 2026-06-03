from app.schemas.location_schema import CurrentLocation

# Global variable
current_location: CurrentLocation | None = None


# storing phones current location
def save_location(location: CurrentLocation):
    global current_location
    current_location = location


# request current location
def get_location():
    return current_location
