from flask import Blueprint, jsonify, request
from app.models.obra import Obra
from app.models import db
from app.Serializers.obra_serializer import ObraSchema

obra_bp = Blueprint('obra', __name__)

obra_schema = ObraSchema()
obras_schema = ObraSchema(many=True)

@obra_bp.route("/obras", methods=['GET'])
def get_obras():
    obras = Obra.query.all()
    return jsonify(obras_schema.dump(obras))

@obra_bp.route("/obra/<int:id>", methods=['GET'])
def get_obra(id):
    obra = Obra.query.get_or_404(id)
    return jsonify(obra_schema.dump(obra))

@obra_bp.route("/obra", methods=['POST'])
def create_obra():
    data = request.get_json()
    obra = obra_schema.load(data, session=db.session)
    db.session.add(obra)
    db.session.commit()
    return jsonify(obra_schema.dump(obra)), 201