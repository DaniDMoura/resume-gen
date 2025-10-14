from datetime import datetime, timedelta
from http import HTTPStatus
from pathlib import Path
from zoneinfo import ZoneInfo
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType

from httpx import AsyncClient
from jwt import DecodeError, ExpiredSignatureError, encode, decode
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.background import BackgroundTasks


from core import settings
from core.database import get_session
from core.models import AuthProvider, User
from core.services.security import (
    get_current_user,
    get_password_hash,
    verify_password,
    create_token,
)
from core.settings import Settings
from core.schemas import Message, ResetPasswordSchema

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

router = APIRouter()
settings = Settings()


@router.post("/login")
@limiter.limit("5/minute")
async def login_for_access_token(
    request: Request,
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session),
):
    login_exception = HTTPException(
        status_code=HTTPStatus.UNAUTHORIZED, detail="Incorrect email or password"
    )

    user = await session.scalar(select(User).where(User.email == form_data.username))

    if not user:
        raise login_exception

    if not verify_password(form_data.password, user.password):
        raise login_exception

    access_token = create_token(data={"sub": user.email})

    response.set_cookie( 
        key="access_token", 
        value=access_token, 
        samesite="lax", 
        max_age=60 * 60 * 2
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/refresh-token")
async def refresh_access_token(response: Response, current_user: User = Depends(get_current_user)):
    new_access_token = create_token(data={"sub": current_user.email})

    response.set_cookie( 
        key="access_token", 
        value=new_access_token, 
        samesite="lax", 
        max_age=60 * 60 * 2
    )

    return {"access_token": new_access_token, "token_type": "bearer"}


conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_FROM,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=f'"Resumely" <{settings.MAIL_FROM}>',
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    TEMPLATE_FOLDER=(Path(__file__).parent.parent / "mail").resolve(),
)


@router.post("/forgot-password", status_code=HTTPStatus.OK, response_model=Message)
@limiter.limit("3/minute")
async def forgot_password(
    request: Request,
    email: str,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
):
    db_user = await session.scalar(select(User).where(User.email == email))

    if db_user:
        expire = datetime.now(tz=ZoneInfo("America/Sao_Paulo")) + timedelta(minutes=10)
        secret_token = encode(
            {
                "sub": email,
                "exp": int(expire.timestamp()),
            },
            settings.SECRET_JWT_EMAIL_KEY,
            settings.ALGORITHM,
        )

        email_body = {
            "company_name": "Resumely",
            "link_expiry_min": 10,
            "reset_link": f"{settings.FORGET_PASSWORD_URL}/{secret_token}",
        }

        message = MessageSchema(
            subject="Password Reset Instructions",
            recipients=[email],
            template_body=email_body,
            subtype=MessageType.html,
        )

        template_name = "password_reset.html"

        fm = FastMail(conf)
        background_tasks.add_task(fm.send_message, message, template_name)

    return {"message": "If the email exists, instructions have been sent."}


@router.post("/reset-password", status_code=HTTPStatus.OK, response_model=Message)
@limiter.limit("3/minute")
async def reset_password(
    request: Request,
    data: ResetPasswordSchema,
    session: AsyncSession = Depends(get_session),
):
    credential_exception = HTTPException(
        status_code=HTTPStatus.UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:

        payload = decode(
            data.email_token, settings.SECRET_JWT_EMAIL_KEY, settings.ALGORITHM
        )
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

    user.password = get_password_hash(data.new_password)

    await session.commit()
    await session.refresh(user)

    return {"message": "Password successfully changed"}


@router.get("/login/google")
@limiter.limit("5/minute")
async def login_google(request: Request):
    google_url = (
        "https://accounts.google.com/o/oauth2/auth"
        f"?response_type=code"
        f"&client_id={settings.GOOGLE_CLIENT_ID}"
        f"&redirect_uri={settings.GOOGLE_REDIRECT_URI}"
        f"&scope=openid%20profile%20email"
        f"&access_type=offline"
    )
    return RedirectResponse(url=google_url)


@router.get("/google/callback")
@limiter.limit("5/minute")
async def auth_google(
    request: Request, code: str, session: AsyncSession = Depends(get_session)
):
    token_url = "https://accounts.google.com/o/oauth2/token"
    data = {
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    async with AsyncClient() as client:
        token_res = await client.post(token_url, data=data)

        if token_res.status_code != 200:
            raise HTTPException(
                status_code=token_res.status_code, detail="Failed to get token"
            )
        access_token = token_res.json().get("access_token")

        if not access_token:
            raise HTTPException(status_code=400, detail="No access token returned")

        user_res = await client.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        if user_res.status_code != 200:
            raise HTTPException(
                status_code=user_res.status_code, detail="Failed to fetch user info"
            )

        google_user = user_res.json()
        email = google_user.get("email")
        name = google_user.get("name") or email.split("@")[0]

    db_user = await session.scalar(select(User).where(User.email == email))

    if not db_user:

        new_user = User(
            username=name, email=email, password=None, provider=AuthProvider.google
        )

        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)

    access_token = create_token(data={"sub": email})

    redirect_url = "http://localhost:3000/dashboard"
    response = RedirectResponse(url=redirect_url, status_code=302)
    response.set_cookie(
        key="access_token", value=access_token, samesite="lax", max_age=60 * 60 * 2
    )

    return response
