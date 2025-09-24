from fastapi import APIRouter, Depends, HTTPException
from http import HTTPStatus
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from core.models import User
from core.services.security import get_current_user, get_password_hash
from core.database import get_session
from core.schemas import UserSchema, CreateUser, PatchUser, DeleteMessage


router = APIRouter()


@router.post("/", status_code=HTTPStatus.CREATED, response_model=UserSchema)
async def create_user(user: CreateUser, session: AsyncSession = Depends(get_session)):
    db_user = await session.scalar(
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


@router.get("/", status_code=HTTPStatus.OK, response_model=UserSchema)
def get_user_info(current_user: User = Depends(get_current_user)):
    return current_user


@router.patch("/{user_id}", status_code=HTTPStatus.OK, response_model=UserSchema)
async def update_user(
    user_id: int,
    new_user: PatchUser,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if user_id != current_user.id:
        raise HTTPException(
            detail="Not enough permissions", status_code=HTTPStatus.UNAUTHORIZED
        )

    try:
        if new_user.username is not None:
            current_user.username = new_user.username
        if new_user.email is not None:
            current_user.email = new_user.email
        if new_user.password is not None:
            current_user.password = get_password_hash(new_user.password)

        await session.commit()
        await session.refresh(current_user)

    except IntegrityError:
        raise HTTPException(
            status_code=HTTPStatus.CONFLICT,
            detail="Username or Email already exists",
        )

    return current_user


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
