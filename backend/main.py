from app.config.config import settings
from app.database.supabase_client import supabase
from app.routes.auth_routes import router as auth_router
from app.routes.current_location_routes import (
    router as current_location_router,
)
from app.routes.location_routes import router as location_router
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MapToMeet API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(location_router, prefix="/locations")
# this creates POST /current-location
app.include_router(
    current_location_router,
    prefix="/current_location",
    tags=["Current Location"],
)
app.include_router(auth_router)


@app.get("/")
def home():
    return {"message": "MapToMeet Backend running successfully"}


@app.get("/test-db")
def test_db():
    try:
        # Fetches data from your 'categories' table
        response = supabase.table("categories").select("*").execute()
        return {"success": True, "count": len(response.data), "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
