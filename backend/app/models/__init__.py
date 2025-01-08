from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .obra import Obra
from .endereco import Endereco

__all__ = [
    'db',
    'User',
    'Obra',
    'Endereco',
]