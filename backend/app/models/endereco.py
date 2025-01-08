from sqlalchemy.orm import Mapped, mapped_column
from . import db

class Endereco(db.Model):
    __tablename__ = "endereco"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    cep: Mapped[str] = mapped_column(nullable=False)
    numero: Mapped[str] = mapped_column(nullable=False)
    estado: Mapped[str] = mapped_column(nullable=True)
    cidade: Mapped[str] = mapped_column(nullable=False)
    bairro: Mapped[str] = mapped_column(nullable=False)
    rua: Mapped[str] = mapped_column(nullable=False)

    user_id: Mapped[int] = mapped_column(db.ForeignKey('users.id'), nullable=False)
    
    def __str__(self) -> str:
        return f"{self.rua}, {self.numero} - {self.cidade}/{self.estado}"