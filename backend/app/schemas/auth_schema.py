import json

from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginRequestAdmin(BaseModel):
    email: EmailStr
    password: str
    
class RegisterRequestAdmin(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    permissions: dict[str, bool]