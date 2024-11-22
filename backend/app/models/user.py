from flask_login import UserMixin
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Enum
from . import db
from .enums import GenderEnum

class User(UserMixin, db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, nullable=False)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(unique=True)
    admin: Mapped[bool] = mapped_column(default=False)
    gender: Mapped[GenderEnum] = mapped_column(Enum(GenderEnum), default=GenderEnum.MALE)

    def __str__(self) -> str:
        return self.username

    
    