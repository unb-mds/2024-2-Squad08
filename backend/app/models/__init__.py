from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

from .user import User
from .obra import Obra
from .endereco import Endereco

__all__ = [
    'db',
    'User',
    'Obra',
    'Endereco',
]