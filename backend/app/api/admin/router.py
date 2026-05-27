#Khai bao router cho API v1
from fastapi import APIRouter
from app.api.admin.endpoints import auth

api_router_admin = APIRouter()

api_router_admin.include_router(
    auth.router,
    prefix="/auth",
    tags=["Auth Admin"]
)
