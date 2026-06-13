# this file defines what data frontend sends specifically for authentication

from pydantic import BaseModel, EmailStr, Field


# here Basemodel is is a class of pydantic library.
# used for validation, convertion to json, generate swagger docs
class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=50)
    email: EmailStr

    password: str = Field(min_length=8, max_length=50)
