from app.services.auth_service import get_user_by_id
from app.utils.security import decode_access_token
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

# Reads "Authorization: Bearer <token>"
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    # Extract JWT token
    token = credentials.credentials
    # Decode JWT
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    # Extract user id from token
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token payload",
        )

    # Fetch user from database
    user = get_user_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user
