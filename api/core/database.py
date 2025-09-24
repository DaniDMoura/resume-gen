from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from core.settings import Settings

settings = Settings()

database_engine = create_async_engine(url=settings.DATABASE_URL)

async_session = async_sessionmaker(
    bind=database_engine, class_=AsyncSession, expire_on_commit=False
)


async def get_session():
    async with async_session() as session:
        yield session
