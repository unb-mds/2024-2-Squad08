from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from ..models.obra import Obra

class ObraSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Obra
        load_instance = True
        include_relationships = True