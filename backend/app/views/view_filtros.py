from flask import Blueprint, jsonify, request
from app.models.obra import Obra
from app.models import db
from app.serializers.obra_serializer import ObraSchema

obra_bp = Blueprint('obra', __name__)

obra_schema = ObraSchema()
obras_schema = ObraSchema(many=True)

@obra_bp.route("/obras", methods=['GET'])
def get_obras():
    executor = request.args.get('executor')
    tipo = request.args.get('tipo')
    regiao = request.args.get('regiao')
    valor = request.args.get('valor')

    query = Obra.query

    if executor:
        query = query.filter(Obra.executor == executor)
    if tipo:
        query = query.filter(Obra.type == tipo)
    if regiao:
        query = query.filter(Obra.region == regiao)
    if valor:
        query = query.filter(Obra.value == valor)

    obras = query.all()

    return jsonify(obras_schema.dump(obras))

@obra_bp.route("/obra/<int:id>", methods=['GET'])
def get_obra(id):
    obra = Obra.query.get_or_404(id)
    return jsonify(obra_schema.dump(obra))
