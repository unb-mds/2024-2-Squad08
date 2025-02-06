from sqlalchemy.orm import Mapped, mapped_column
from . import db

class Endereco(db.Model):
    __tablename__ = "endereco"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, nullable=False)
    user_id: Mapped[int] = mapped_column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)  # Changed from 'cadastro' to 'usuario'
    cep: Mapped[str] = mapped_column(db.String(8), nullable=False)
    cidade: Mapped[str] = mapped_column(db.String(100), nullable=False)
    estado: Mapped[str] = mapped_column(db.String(100), nullable=False)
    rua: Mapped[str] = mapped_column(db.String(255), nullable=False)
    bairro: Mapped[str] = mapped_column(db.String(255), nullable=False)
    numero: Mapped[str] = mapped_column(db.String(10), nullable=False)

    usuario = db.relationship('Usuario', backref='endereco', lazy=True)

    def __str__(self) -> str:
        return f"{self.rua}, {self.numero} - {self.bairro}, {self.cidade}, {self.estado}"