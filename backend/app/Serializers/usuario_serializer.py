from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from ..models.usuario import Usuario

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario
        load_instance = True
        include_relationships = True