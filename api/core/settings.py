from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    config_dict = SettingsConfigDict(env_file=".env.development",env_file_encoding="utf-8",extra=["ignore"])

    DATABASE_URL: str
    ALGORITHM: str
    SECRET_JWT_KEY: str
    EXPIRE_TIME: int