from flask_login import UserMixin
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from . import db

class Usuario(UserMixin, db.Model):
    __tablename__ = "usuario"  
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, nullable=False)
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    admin: Mapped[bool] = mapped_column(default=False)

    # Campos para redefinição de senha
    reset_token: Mapped[str | None] = mapped_column(db.String(255), nullable=True)
    token_created_at: Mapped[datetime | None] = mapped_column(db.DateTime, nullable=True)
    token_expired_at: Mapped[datetime | None] = mapped_column(db.DateTime, nullable=True)

    def __str__(self) -> str:
        return self.username
