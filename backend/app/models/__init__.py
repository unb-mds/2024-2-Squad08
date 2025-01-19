# app/models/__init__.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .obra import Obra
from .usuario import Usuario
from .enums import GenderEnum