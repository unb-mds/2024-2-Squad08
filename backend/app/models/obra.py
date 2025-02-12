from datetime import date
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from . import db

class Obra(db.Model):
    __tablename__ = "obras"
    
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(db.String, nullable=True)
    uf: Mapped[str] = mapped_column(db.String, nullable=True)
    situacao: Mapped[str] = mapped_column(db.String, nullable=True)
    tipo: Mapped[str] = mapped_column(db.String, nullable=True)
    executores: Mapped[str] = mapped_column(db.String, nullable=True)
    natureza: Mapped[str] = mapped_column(db.String, nullable=True)
    endereco: Mapped[str] = mapped_column(db.String, nullable=True)
    funcaoSocial: Mapped[str] = mapped_column(db.Text, nullable=True)
    dataInicialPrevista: Mapped[date | None] = mapped_column(db.Date, nullable=True)
    dataFinalPrevista: Mapped[date | None] = mapped_column(db.Date, nullable=True)
    fontesDeRecurso: Mapped[dict] = mapped_column(JSONB, nullable=True)
    valorInvestimentoPrevisto: Mapped[float] = mapped_column(db.Float, nullable=True)
    origemRecurso: Mapped[str] = mapped_column(db.String, nullable=True)
    qdtEmpregosGerados: Mapped[int] = mapped_column(db.Integer, nullable=True)
    geometria: Mapped[str | None] = mapped_column(db.String, nullable=True)