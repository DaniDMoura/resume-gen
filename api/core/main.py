from fastapi import FastAPI
from .routes.auth import router as auth_router
from .routes.resume import router as resume_router


app = FastAPI()


app.include_router(router=auth_router, prefix="/auth", tags=["Auth"])
app.include_router(router=resume_router, prefix="/resume", tags=["Resume"])
