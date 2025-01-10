from sqlalchemy.orm import Mapped, mapped_column
from . import db
from datetime import datetime

class novaSenha(db.Model):
    __tablename__ = 'novaSenha'
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, nullable=False)
    user_id: Mapped[int] = mapped_column(db.Integer, db.ForeignKey('cadastro.id'), nullable=False)
    token: Mapped[str] = mapped_column(db.String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime, default=datetime.utcnow, nullable=False)
    expired_at: Mapped[datetime] = mapped_column(db.DateTime, nullable=False)

    usuario = db.relationship('Cadastro', backref='novaSenha', lazy=True)

    def __str__(self) -> str:
        return f'Token para redefinir a senha do usuário {self.usuario.email}'
