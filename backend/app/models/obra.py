from datetime import date
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from . import db

class Obra(db.Model):
    __tablename__ = "obras"
    
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(db.String)
    uf: Mapped[str] = mapped_column(db.String)
    situacao: Mapped[str] = mapped_column(db.String)
    tipo: Mapped[str] = mapped_column(db.String)
    executores: Mapped[str] = mapped_column(db.String)  
    natureza: Mapped[str] = mapped_column(db.String)
    endereco: Mapped[str] = mapped_column(db.String)
    funcaoSocial: Mapped[str] = mapped_column(db.Text)
    dataInicialPrevista: Mapped[date] = mapped_column(db.Date)
    dataFinalPrevista: Mapped[date] = mapped_column(db.Date)
    fontesDeRecurso: Mapped[dict] = mapped_column(JSONB)  
    valorInvestimentoPrevisto: Mapped[float] = mapped_column(db.Float)
    origemRecurso: Mapped[str] = mapped_column(db.String)
    qdtEmpregosGerados: Mapped[int] = mapped_column(db.Integer)
    geometria: Mapped[str | None] = mapped_column(db.String, nullable=True)

    def __str__(self) -> str:
        return f"{self.nome} - {self.uf} - {self.situacao} - {self.tipo} - {self.executores} - {self.natureza} - {self.endereco} - {self.funcaoSocial} - {self.dataInicialPrevista} - {self.dataFinalPrevista} - {self.fontesDeRecurso} - {self.valorInvestimentoPrevisto} - {self.origemRecurso} - {self.qdtEmpregosGerados} - {self.geometria}"