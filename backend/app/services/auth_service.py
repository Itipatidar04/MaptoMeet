from typing import Any

from app.database.supabase_client import supabase
from app.utils.security import hash_password

# if the user table contains this email then it returns name, email, id


def get_user_by_email(email: str) -> dict[str, Any] | None:
    response = supabase.table("users").select("*").eq("email", email).execute()

    if response.data:
        return response.data[0]
    # else if email does not exist then it returns none
    return None


# it gets user by id whn jwt is decoded
def get_user_by_id(user_id: str) -> dict[str, Any] | None:
    response = supabase.table("users").select("*").eq("id", user_id).execute()
    if response.data:
        return response.data[0]
    return None


# create a new user in the users table in supabase
def create_user(name: str, email: str, password: str) -> dict[str, Any]:

    hashed_password = hash_password(password)

    response = (
        supabase.table("users")
        .insert(
            {
                "name": name,
                "email": email,
                "password_hash": hashed_password,
            }
        )
        .execute()
    )

    return response.data[0]
