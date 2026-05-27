import json

from sqlalchemy.orm import Session
from app.models.admin import Admin

def find_by_email(db: Session, email: str):
    return db.query(Admin).filter(Admin.email == email).first()

# def create_admin(db: Session, email: str, password_hash: str, full_name: str, permissions: json):
#     new_admin = Admin(email=email, password_hash=password_hash, full_name=full_name, permissions=permissions)
#     db.add(new_admin)
#     db.commit()
#     db.refresh(new_admin)

#     return new_admin

def create_admin(
    db: Session,
    email: str,
    password_hash: str,
    full_name: str,
    permissions: dict,
    created_by: int | None = None,
    updated_by: int | None = None
):
    admin = Admin(
        email=email,
        password_hash=password_hash,
        full_name=full_name,
        permissions=permissions,
        role="admin",
        created_by=created_by,
        updated_by=updated_by
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return admin

def get_all_admin(db: Session):
    return db.query(Admin).all()

def get_admin_by_id(db: Session, admin_id: int):
    return db.query(Admin).filter(Admin.id == admin_id).first()