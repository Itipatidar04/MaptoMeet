# schema that validates incoming regstration data
# it imports dependencies which find who is currently logged in by finding user from access token/bearer
from app.dependencies.auth import get_current_user
from app.schemas.auth_schema import RegisterRequest
from app.schemas.login_schema import LoginRequest

# service function used to ceck if user already exists
from app.services.auth_service import (
    create_user,
    get_user_by_email,
)

# import for creating access point
from app.utils.security import create_access_token, verify_password
from fastapi import APIRouter, Depends, HTTPException

# create router for all authentication-related endpoint
router = APIRouter(prefix="/auth", tags=["Authentication"])


# post /auth/register


@router.post("/register")
def register(user: RegisterRequest):

    # check if a user with this email already exists
    # returns user data if found, otherwise none
    existing_user = get_user_by_email(user.email)

    # Prevent duplicate account creation
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user in Supabase
    new_user = create_user(
        name=user.name,
        email=user.email,
        password=user.password,
    )

    return {
        "message": "User created successfully",
        "user": {
            "id": new_user["id"],
            "name": new_user["name"],
            "email": new_user["email"],
        },
    }


@router.post("/login")
def login(user: LoginRequest):
    # Find user by email
    existing_user = get_user_by_email(user.email)

    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Verify password
    if not verify_password(user.password, existing_user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Create JWT token
    access_token = create_access_token(
        {
            "sub": existing_user["email"],  # sub is subject:who owns this token
            "user_id": existing_user["id"],
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": existing_user["id"],
            "name": existing_user["name"],
            "email": existing_user["email"],
        },
    }


# when frontend sends get auth/me
@router.get("/me")
def get_me(
    # it gets current user->jwt decoded and user found->user fetched from supabase
    current_user=Depends(get_current_user),
):
    return {
        "id": current_user["id"],
        "name": current_user["name"],
        "email": current_user["email"],
    }
