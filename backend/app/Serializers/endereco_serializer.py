from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from ..models.endereco import Endereco 

class EnderecoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Endereco 
        load_instance = True
        include_relationships = True 