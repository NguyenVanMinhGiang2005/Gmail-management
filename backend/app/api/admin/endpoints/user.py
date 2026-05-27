from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.utils.jwt_util import get_current_admin

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin/auth/login")
router = APIRouter()

@router.get("/users")
def get_users(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    get_current_admin(token)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    # Logic to retrieve users from the database
    return {"users": []}  # Replace with actual user data