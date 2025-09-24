from fastapi import APIRouter, Depends, HTTPException
from http import HTTPStatus
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import User
from core.services.security import get_current_user, get_password_hash
from core.database import get_session
from core.schemas import UserSchema, CreateUser, PatchUser, DeleteMessage


router = APIRouter()


@router.post("/", status_code=HTTPStatus.CREATED, response_model=UserSchema)
async def create_user(user: CreateUser, session: AsyncSession = Depends(get_session)):
    db_user = session.scalar(
        select(User).where(
            (User.username == user.username) | (User.email == user.email)
        )
    )

    if db_user:
        if db_user.email == user.email:
            raise HTTPException(
                detail="Email already exists", status_code=HTTPStatus.CONFLICT
            )
        if db_user.username == user.username:
            raise HTTPException(
                detail="Username already exists", status_code=HTTPStatus.CONFLICT
            )
        
    hashed_password = get_password_hash(user.password)

    db_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,
    )

    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)

    return db_user


@router.get("/{user_id}", status_code=HTTPStatus.OK, response_model=UserSchema)
def get_user_info(current_user: User = Depends(get_current_user)):
    return current_user


@router.patch("/{user_id}", status_code=HTTPStatus.OK, response_model=UserSchema)
def update_user(current_user: User = Depends(get_current_user)):

    return ...


@router.delete("/{user_id}", status_code=HTTPStatus.OK, response_model=DeleteMessage)
async def delete_user(
    user_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if user_id != current_user.id:
        raise HTTPException(
            detail="Not enough permissions", status_code=HTTPStatus.UNAUTHORIZED
        )

    await session.delete(current_user)
    await session.commit()

    return {"detail": "User deleted"}
