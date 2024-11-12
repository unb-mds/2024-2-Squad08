from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Enum, Date
import enum

db = SQLAlchemy()

class GenderEnum(enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class User(UserMixin, db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column(unique=True)
    admin: Mapped[bool] = mapped_column(default=False)
    gender: Mapped[GenderEnum] = mapped_column(Enum(GenderEnum), default=GenderEnum.MALE)

class Obra(db.Model):
    __tablename__ = "adresses"
    id: Mapped[int] = mapped_column(primary_key=True)
    street: Mapped[str] = mapped_column()
    city: Mapped[str]  = mapped_column()
    state: Mapped[str] = mapped_column()
    zip_code: Mapped[int] = mapped_column()
    value: Mapped[int] = mapped_column()
    begin: Mapped[Date] = mapped_column()
    end: Mapped[Date] = mapped_column()

class WorkType(enum.Enum):
    INFRA = "Infraestrutura"
    EDU = "Educacional"
    ASSIS = "Assistencia Social"
    SAUDE = "Saude"
    SAN = "Saneamento"

class Status(enum.Enum):
    Init = "Iniciada"
    End = "Finalizada"
    Atra = "Atrasada"
    Par = "Parada"
    Andam = "Andamento"

    type_work: Mapped[WorkType] = mapped_column(Enum(WorkType), default=WorkType.INFRA)