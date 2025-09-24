from http import HTTPStatus
from fastapi import APIRouter, Depends

from core.services.security import get_current_user
from core.models import User

router = APIRouter()


@router.get("/", status_code=HTTPStatus.OK)
def get_resume_info():
    return ...


@router.get("/", status_code=HTTPStatus.OK)
def list_resumes():
    return ...


@router.post("/", status_code=HTTPStatus.CREATED)
def create_resume(current_user: User = Depends(get_current_user)):
    return ...


@router.patch("/", status_code=HTTPStatus.OK)
def update_resume(current_user: User = Depends(get_current_user)):
    return ...


@router.delete("/", status_code=HTTPStatus.OK)
def delete_resume(current_user: User = Depends(get_current_user)):
    return ...


@router.get("/", status_code=HTTPStatus.OK)
def download_cv(current_user: User = Depends(get_current_user)):
    return ...
