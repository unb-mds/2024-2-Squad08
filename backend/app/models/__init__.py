from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .obra import Obra
from .enums import GenderEnum