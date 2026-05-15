from supabase import create_client, Client
from app.config.config import (
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
)

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise ValueError("Supabase credentials missing in .env file")
# Initialize Supabase client
supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
)
