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
    # Aplicação do filtro por tipo de obra
     if tipo:
        if tipo.lower() == "educacao":
            query = query.filter(Obra.type == "Educação")
        elif tipo.lower() == "desenvolvimento":
            query = query.filter(Obra.type == "Desenvolvimento")
        elif tipo.lower() == "administrativo":
            query = query.filter(Obra.type == "Administrativo")
        elif tipo.lower() == "infraestrutura urbana":
            query = query.filter(Obra.type == "Infraestrutura Urbana e Mobilidade")
        elif tipo.lower() == "energia":
            query = query.filter(Obra.type == "Energia")
        elif tipo.lower() == "segurança pública":
            query = query.filter(Obra.type == "Segurança Pública")
        elif tipo.lower() == "esporte":
            query = query.filter(Obra.type == "Esporte")
        elif tipo.lower() == "rodovia":
            query = query.filter(Obra.type == "Rodovia")
        else:
            return jsonify({"error": "Tipo de obra não encontrado"}), 404
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
