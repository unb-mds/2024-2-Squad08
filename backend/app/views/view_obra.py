# app/views/view_obra.py
from flask import Blueprint, jsonify
from ..services.api_consumer import ObraAPIConsumer
from ..services.obra_service import ObraService
from app.models.obra import Obra
from shapely.geometry import mapping
from shapely import wkt

obra_bp = Blueprint('obra', __name__)


@obra_bp.route('/sync/<uf>', methods=['POST'])
def sync_obras(uf):
    try:
        consumer = ObraAPIConsumer()
        service = ObraService(consumer)
        result = service.sync_obras_for_uf(uf)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            'error': str(e)
    }), 500
    
@obra_bp.route('/', methods=['GET'])
def get_obras():
    try:
        obras = Obra.query.all()
        obras_data = [{
            'id': obra.id,
            'nome': obra.nome,
            'uf': obra.uf,
            'situacao': obra.situacao,
            'tipo': obra.tipo,
            'executores': obra.executores,
            'natureza': obra.natureza,
            'endereco': obra.endereco,
            'funcaoSocial': obra.funcaoSocial,
            'dataInicialPrevista': obra.dataInicialPrevista.isoformat() if obra.dataInicialPrevista else None,
            'dataFinalPrevista': obra.dataFinalPrevista.isoformat() if obra.dataFinalPrevista else None,
            'fontesDeRecurso': obra.fontesDeRecurso,
            'valorInvestimentoPrevisto': obra.valorInvestimentoPrevisto,
            'origemRecurso': obra.origemRecurso,
            'qdtEmpregosGerados': obra.qdtEmpregosGerados,
            'geometria': extract_geometry(obra.geometria) if obra.geometria else None
        } for obra in obras]
        return jsonify(obras_data), 200
    except Exception as e:
        print(f"Error in get_obras: {str(e)}")
        return jsonify({'error': str(e)}), 500

def extract_geometry(wkt_string):
    if not wkt_string:
        return None
        
    try:
        geometry = wkt.loads(wkt_string)
        return mapping(geometry)
    except Exception as e:
        print(f"Error converting WKT: {e}")
        return None