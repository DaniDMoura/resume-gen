from http import HTTPStatus
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_session
from core.models import User
from core.services.security import verify_password, create_token

router = APIRouter()


@router.post("/login", status_code=HTTPStatus.OK)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session),
):
    login_exception = HTTPException(
        status_code=HTTPStatus.UNAUTHORIZED, detail="Incorrect username or password"
    )

    user = await session.scalar(select(User).where(User.email == form_data.username))

    if not user:
        raise login_exception

    if not verify_password(form_data.password, user.password):
        raise login_exception

    access_token = create_token(data={"sub": user.email})

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/forgot-password", status_code=HTTPStatus.OK)
def forgot_password():
    return ...
