from sqlalchemy.orm import registry, Mapped, mapped_column, relationship
from sqlalchemy import func, ForeignKey, String, Date, Enum, ARRAY
from datetime import datetime
from enum import StrEnum


class LangProficiencyEnum(StrEnum):
    begginer = "Beginner"
    intermediate = "Intermediate"
    advanced = "Advanced"
    native = "Native"


table_registry = registry()


@table_registry.mapped_as_dataclass
class User:
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    username: Mapped[str] = mapped_column(String, unique=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    password: Mapped[str] = mapped_column(String, index=True)
    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )

    resumes: Mapped[list["Resume"]] = relationship(
        back_populates="user", cascade="all, delete-orphan", lazy="selectin", init=False
    )


@table_registry.mapped_as_dataclass
class Resume:
    __tablename__ = "resume"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    tenant: Mapped[str] = mapped_column(String, unique=True)
    name: Mapped[str] = mapped_column(String)
    number: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    bio: Mapped[str] = mapped_column(String)
    site1: Mapped[str] = mapped_column(String, nullable=True)
    site2: Mapped[str] = mapped_column(String, nullable=True)
    about: Mapped[str] = mapped_column(String, nullable=True)
    skills: Mapped[list[str]] = mapped_column(ARRAY(String), nullable=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), index=True)
    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )

    projects: Mapped[list["Project"]] = relationship(
        back_populates="resume",
        cascade="all, delete-orphan",
        lazy="selectin",
        init=False,
    )
    experience: Mapped[list["Experience"]] = relationship(
        back_populates="resume",
        cascade="all, delete-orphan",
        lazy="selectin",
        init=False,
    )
    languages: Mapped[list["Language"]] = relationship(
        back_populates="resume",
        cascade="all, delete-orphan",
        lazy="selectin",
        init=False,
    )
    certifications: Mapped[list["Certification"]] = relationship(
        back_populates="resume",
        cascade="all, delete-orphan",
        lazy="selectin",
        init=False,
    )
    education: Mapped[list["Education"]] = relationship(
        back_populates="resume",
        cascade="all, delete-orphan",
        lazy="selectin",
        init=False,
    )

    user: Mapped["User"] = relationship(back_populates="resumes")


@table_registry.mapped_as_dataclass
class Project:
    __tablename__ = "project"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    title: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    tools: Mapped[list[str]] = mapped_column(ARRAY(String), nullable=True)
    link: Mapped[str] = mapped_column(String, nullable=True)

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)
    resume: Mapped["Resume"] = relationship(back_populates="projects")


@table_registry.mapped_as_dataclass
class Experience:
    __tablename__ = "experience"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    company: Mapped[str] = mapped_column(String)
    role: Mapped[str] = mapped_column(String)
    startDate: Mapped[Date] = mapped_column(Date)
    endDate: Mapped[Date] = mapped_column(Date, nullable=True)

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)
    resume: Mapped["Resume"] = relationship(back_populates="experience")


@table_registry.mapped_as_dataclass
class Language:
    __tablename__ = "language"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str] = mapped_column(String)
    proficiency: Mapped[LangProficiencyEnum] = mapped_column(Enum(LangProficiencyEnum))

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)
    resume: Mapped["Resume"] = relationship(back_populates="languages")


@table_registry.mapped_as_dataclass
class Certification:
    __tablename__ = "certification"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    title: Mapped[str] = mapped_column(String)
    issuer: Mapped[str] = mapped_column(String)
    date: Mapped[Date] = mapped_column(Date)
    link: Mapped[str] = mapped_column(String, nullable=True)

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)
    resume: Mapped["Resume"] = relationship(back_populates="certifications")


@table_registry.mapped_as_dataclass
class Education:
    __tablename__ = "education"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    institution: Mapped[str] = mapped_column(String)
    degree: Mapped[str] = mapped_column(String)
    fieldOfStudy: Mapped[str] = mapped_column(String)
    startDate: Mapped[Date] = mapped_column(Date)
    endDate: Mapped[Date] = mapped_column(Date, nullable=True)
    description: Mapped[str] = mapped_column(String, nullable=True)

    resume_id: Mapped[int] = mapped_column(ForeignKey("resume.id"), index=True)
    resume: Mapped["Resume"] = relationship(back_populates="education")
