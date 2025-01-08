from datetime import date
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Enum
from . import db

class Obra(db.Model):
    __tablename__ = "obras"
    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column()
    uf: Mapped[str] = mapped_column()
    situacao: Mapped[str] = mapped_column()
    tipo: Mapped[str] = mapped_column()
    executores: Mapped[str] = mapped_column()
    natureza:  Mapped[str] = mapped_column()
    endereco: Mapped[str] = mapped_column()
    funcaoSocial: Mapped[str] = mapped_column()
    dataInicialPrevista: Mapped[date] = mapped_column()
    dataFinalPrevista: Mapped[date] = mapped_column()
    fontesDeRecurso: Mapped[str] = mapped_column()
    valorInvestimentoPrevisto: Mapped[float] = mapped_column()
    origemRecurso: Mapped[str] = mapped_column()
    qdtEmpregosGerados: Mapped[str] = mapped_column()
    geometria: Mapped[str] = mapped_column()

    def __str__(self) -> str:
        return f"{self.nome} - {self.uf} - {self.situacao} - {self.tipo} - {self.executores} - {self.natureza} - {self.endereco} - {self.funcaoSocial} - {self.dataInicialPrevista} - {self.dataFinalPrevista} - {self.fontesDeRecurso} - {self.valorTotal} - {self.origemRecurso} - {self.qdtEmpregosGerados} - {self.geometria}"
    
