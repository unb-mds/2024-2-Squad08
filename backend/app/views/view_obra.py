from flask import jsonify, Blueprint
from ..services.obra_service import ObraAPIConsumer
from ..models.obra import Obra

obra_bp = Blueprint('obra', __name__)

@obra_bp.route('/sync-obras/<uf>', methods=['POST'])
def sync_obras(uf):
    consumer = ObraAPIConsumer()
    obras_data = consumer.fetch_obras(uf)
    
    if obras_data is None:
        return jsonify({
            'status': 'error',
            'message': 'Failed to fetch data from API'
        }), 500
    
    result = consumer.save_to_database(obras_data)
    
    return jsonify({
        'status': 'success',
        'data': result
    })

@obra_bp.route('/<uf>', methods=['GET'])
def get_obras(uf):
    try:
        obras = Obra.query.filter_by(uf=uf).all()
        return jsonify([{
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
            'valorInvestimentoPrevisto': float(obra.valorInvestimentoPrevisto),
            'origemRecurso': obra.origemRecurso,
            'qdtEmpregosGerados': obra.qdtEmpregosGerados,
            'geometria': obra.geometria
        } for obra in obras])
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500