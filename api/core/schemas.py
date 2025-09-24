from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime, date
from typing import List, Optional

from core.models import LangProficiencyEnum


class EducationSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    institution: str
    degree: str
    fieldOfStudy: str
    description: Optional[str]
    startDate: date
    endDate: Optional[date]

    resume_id: int


class CertificationSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    issuer: str
    date: date
    link: Optional[str]

    resume_id: int


class LanguageSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    proficiency: LangProficiencyEnum

    resume_id: int


class ExperienceSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    company: str
    role: str
    startDate: date
    endDate: Optional[date]

    resume_id: int


class ProjectSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    description: str
    tools: Optional[List[str]]
    link: Optional[str]

    resume_id: int


class ResumeSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    tenant: str
    name: str
    number: str
    email: str
    bio: str
    site1: Optional[str]
    site2: Optional[str]
    about: Optional[str]
    skills: Optional[List[str]]

    created_at: datetime
    updated_at: datetime

    projects: Optional[List[ProjectSchema]]
    experience: Optional[List[ExperienceSchema]]
    languages: Optional[List[LanguageSchema]]
    certifications: Optional[List[CertificationSchema]]
    education: Optional[List[EducationSchema]]

    user_id: int


class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    email: str
    password: str

    created_at: datetime
    updated_at: Optional[datetime]

    resumes: Optional[List[ResumeSchema]]


class DeleteMessage(BaseModel):
    detail: str


class CreateUser(BaseModel):
    username: str
    email: EmailStr
    password: str


class PatchUser(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]


class CreateResume(BaseModel):
    tenant: str
    name: str
    number: str
    email: str
    bio: str
    site1: Optional[str]
    site2: Optional[str]
    about: Optional[str]
    skills: Optional[List[str]]

    projects: Optional[List[ProjectSchema]]
    experience: Optional[List[ExperienceSchema]]
    languages: Optional[List[LanguageSchema]]
    certifications: Optional[List[CertificationSchema]]
    education: Optional[List[EducationSchema]]

    user_id: int


class PatchResume(BaseModel):
    tenant: Optional[str]
    name: Optional[str]
    number: Optional[str]
    email: Optional[str]
    bio: Optional[str]
    site1: Optional[str]
    site2: Optional[str]
    about: Optional[str]
    skills: Optional[List[str]]

    projects: Optional[List[ProjectSchema]]
    experience: Optional[List[ExperienceSchema]]
    languages: Optional[List[LanguageSchema]]
    certifications: Optional[List[CertificationSchema]]
    education: Optional[List[EducationSchema]]
