from datetime import datetime, timedelta
from http import HTTPStatus
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash
from zoneinfo import ZoneInfo
from jwt import DecodeError, ExpiredSignatureError, encode, decode
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from core.settings import Settings
from core.database import get_session
from core.models import User

password_context = PasswordHash.recommended()
settings = Settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_password_hash(password: str) -> str:
    return password_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_context.verify(plain_password, hashed_password)


def create_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(tz=ZoneInfo("America/Sao_Paulo")) + timedelta(
        minutes=settings.EXPIRE_TIME
    )
    to_encode.update({"exp": int(expire.timestamp())})
    encoded_jwt = encode(
        to_encode, settings.SECRET_JWT_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


async def get_current_user(
    session: AsyncSession = Depends(get_session), token: str = Depends(oauth2_scheme)
) -> User:
    credential_exception = HTTPException(
        status_code=HTTPStatus.UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode(token, settings.SECRET_JWT_KEY, settings.ALGORITHM)
        subject_email = payload.get("sub")

        if not subject_email:
            raise credential_exception

    except DecodeError:
        raise credential_exception

    except ExpiredSignatureError:
        raise credential_exception

    user = await session.scalar(select(User).where(User.email == subject_email))

    if not user:
        raise credential_exception

    return user
