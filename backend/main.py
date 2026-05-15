from fastapi import FastAPI, HTTPException
from app.database.supabase_client import supabase

app = FastAPI(title="MapToMeet API")

@app.get("/")
def home():
    return {"message": "MapToMeet Backend running successfully"}

@app.get("/test-db")
def test_db():
    try:
        # Fetches data from your 'categories' table
        response = supabase.table("categories").select("*").execute()
        return {
            "success": True,
            "count": len(response.data),
            "data": response.data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
