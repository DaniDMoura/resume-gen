from sqlalchemy.orm import registry, Mapped, mapped_column, relationship
from sqlalchemy import func, ForeignKey
from datetime import datetime, date
from pydantic import EmailStr
from enum import StrEnum

class LangProficiencyEnum(StrEnum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"
    NATIVE = "Native"

table_registry = registry()


@table_registry.mapped_as_dataclass
class User:
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[EmailStr] = mapped_column(unique=True, index=True)
    password: Mapped[str] = mapped_column(index=True)

    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())

    resumes: Mapped[list["Resume"]] = relationship(
        back_populates="user", cascade="all, delete-orphan", init=False, lazy="selectin"
    )


@table_registry.mapped_as_dataclass
class Resume:
    __tablename__ = "resume"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    number: Mapped[str] 
    email: Mapped[EmailStr]
    bio: Mapped[str]
    site1: Mapped[str] = mapped_column(nullable=True)
    site2: Mapped[str] = mapped_column(nullable=True)

    about: Mapped[str] = mapped_column(nullable=True)
    skills: Mapped[list[str]] = mapped_column(nullable=True)
    projects: Mapped[list["Project"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", init=False, lazy="selectin"
    )

    experience: Mapped[list["Experience"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", init=False, lazy="selectin"
    )
    languages: Mapped[list["Language"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", init=False, lazy="selectin"
    )
    certifications: Mapped[list["Certification"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", init=False, lazy="selectin"
    )
    education: Mapped[list["Education"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", init=False, lazy="selectin"
    )

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), index=True)

    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())


@table_registry.mapped_as_dataclass
class Project:
    __tablename__ = "project"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    title: Mapped[str]
    description: Mapped[str]
    tools: Mapped[list[str]] = mapped_column(nullable=True)
    link: Mapped[str] = mapped_column(nullable=True)

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)


@table_registry.mapped_as_dataclass
class Experience:
    __tablename__ = "experience"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    company: Mapped[str]
    role: Mapped[str]
    startDate: Mapped[date]
    endDate: Mapped[date] = mapped_column(nullable=True)

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)


@table_registry.mapped_as_dataclass
class Language:
    __tablename__ = "language"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str]
    proficiency: Mapped[LangProficiencyEnum]

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)


@table_registry.mapped_as_dataclass
class Certification:
    __tablename__ = "certification"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    title: Mapped[str]
    issuer: Mapped[str]
    date: Mapped[date]
    link: Mapped[str] = mapped_column(nullable=True)

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)


@table_registry.mapped_as_dataclass
class Education:
    __tablename__ = "education"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    institution: Mapped[str]
    degree: Mapped[str]
    fieldOfStudy: Mapped[str]
    startDate: Mapped[date]
    endDate: Mapped[date] = mapped_column(nullable=True)
    description: Mapped[str] = mapped_column(nullable=True)

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)
