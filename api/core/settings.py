from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env.development",env_file_encoding="utf-8",extra="ignore")

    DATABASE_URL: str
    ALGORITHM: str
    SECRET_JWT_KEY: str
    EXPIRE_TIME: int
    FORGET_PASSWORD_URL: str
    SECRET_JWT_EMAIL_KEY: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET:str
    GOOGLE_REDIRECT_URI: str
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str