from flask_login import UserMixin
from sqlalchemy.orm import Mapped, mapped_column
from . import db

class Usuario(UserMixin, db.Model):
    __tablename__ = "cadastro"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, nullable=False)
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    admin: Mapped[bool] = mapped_column(default=False)

    def __str__(self) -> str:
        return self.username

    
    