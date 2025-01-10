# app/views/view_obra.py
from flask import Blueprint, jsonify
from ..services.api_consumer import ObraAPIConsumer
from ..services.obra_service import ObraService

obra_bp = Blueprint('obra', __name__)

@obra_bp.route('/sync/<uf>', methods=['POST'])
def sync_obras(uf):
    """
    Endpoint to sync obras for a specific UF
    """
    try:
        consumer = ObraAPIConsumer()
        service = ObraService(consumer)
        result = service.sync_obras_for_uf(uf)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            'error': str(e)
    }), 500