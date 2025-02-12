from datetime import date, datetime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import event
from . import db

class Obra(db.Model):
    __tablename__ = "obras"
    
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(db.String, nullable=False)
    uf: Mapped[str] = mapped_column(db.String, nullable=False)
    situacao: Mapped[str] = mapped_column(db.String, nullable=False)
    tipo: Mapped[str] = mapped_column(db.String, nullable=False)
    executores: Mapped[str] = mapped_column(db.String, nullable=False)
    natureza: Mapped[str] = mapped_column(db.String, nullable=False)
    endereco: Mapped[str] = mapped_column(db.String, nullable=False)
    funcaoSocial: Mapped[str] = mapped_column(db.Text, nullable=False)
    dataInicialPrevista: Mapped[date | None] = mapped_column(db.Date, nullable=True)
    dataFinalPrevista: Mapped[date | None] = mapped_column(db.Date, nullable=True)
    fontesDeRecurso: Mapped[dict] = mapped_column(JSONB, nullable=False)
    valorInvestimentoPrevisto: Mapped[float] = mapped_column(db.Float, nullable=False)
    origemRecurso: Mapped[str] = mapped_column(db.String, nullable=False)
    qdtEmpregosGerados: Mapped[int] = mapped_column(db.Integer, nullable=False)
    geometria: Mapped[str | None] = mapped_column(db.String, nullable=True)
    created_at: Mapped[date] = mapped_column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<Obra {self.nome}>"
    
