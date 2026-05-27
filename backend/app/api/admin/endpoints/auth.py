from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.auth_schema import LoginRequestAdmin, RegisterRequestAdmin
from app.services.auth_service import AuthServiceAdmin
from app.utils.jwt_util import get_current_admin

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin/auth/login")
router = APIRouter()

# @router.post("/login")
# def login_admin(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     data = LoginRequestAdmin(
#         email=form_data.username,
#         password=form_data.password
#     )
#     return AuthServiceAdmin().login_admin(data, db)

@router.post("/login")
def login_admin(data: LoginRequestAdmin, db: Session = Depends(get_db)):
    return AuthServiceAdmin().login_admin(data, db)

@router.post("/register")
def register_admin(data: RegisterRequestAdmin, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    get_current_admin(token)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return AuthServiceAdmin().register_admin(data, db)

