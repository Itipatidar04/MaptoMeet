from pydantic import BaseModel


# every api request/response should have a defined contact
# schema and pydantic is for validation
class CurrentLocation(BaseModel):
    latitude: float
    longitude: float
