from flask_login import UserMixin
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum
from typing import List
from . import db
from .endereco import Endereco

class User(UserMixin, db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, nullable=False)
    nome: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(unique=True)
    admin: Mapped[bool] = mapped_column(default=False)
    enderecos: Mapped[List["Endereco"]] = relationship("Endereco", backref="user", lazy="dynamic")

    def __str__(self) -> str:
        return self.nome