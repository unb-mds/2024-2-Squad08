from datetime import date
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Enum
from . import db

class Obra(db.Model):
    __tablename__ = "adresses"
    id: Mapped[int] = mapped_column(primary_key=True)
    street: Mapped[str] = mapped_column()
    city: Mapped[str] = mapped_column()
    state: Mapped[str] = mapped_column()
    zip_code: Mapped[int] = mapped_column()
    value: Mapped[int] = mapped_column()
    begin: Mapped[date] = mapped_column()
    end: Mapped[date] = mapped_column()